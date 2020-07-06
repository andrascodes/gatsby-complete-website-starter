import React, { useState, useEffect } from 'react';

const DEFAULT_POSITION = {
  left: 0,
  top: 0,
  show: false,
};
const NAVIGATION_KEY_CODES = [9, 32, 33, 34, 35, 36, 37, 38, 39, 40];
const EVENTS = ['keydown', 'keyup', 'mouseup', 'resize'];

function isOrContains(node, container) {
  while (node) {
    if (node === container) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function getSelection({ targetElement, intersectingNodes }) {
  if (window.getSelection) {
    const selection = window.getSelection();
    const text = selection.toString();

    if (selection.rangeCount) {
      const range = selection.getRangeAt(0).cloneRange();
      const parentElement = range.commonAncestorContainer;

      const isInTargetElement = targetElement
        ? isOrContains(parentElement, targetElement)
        : true;
      const isIntersectingWithNodes = intersectingNodes
        ? intersectingNodes.some(node => {
            if (range.intersectsNode) {
              return range.intersectsNode(node);
            }
            return isOrContains(parentElement, node);
          })
        : false;

      let dimensions = { width: 0, height: 0 };
      if (range.getBoundingClientRect) {
        const rect = range.getBoundingClientRect();
        dimensions = {
          width: rect.right - rect.left,
          height: rect.bottom - rect.top,
        };
      }

      if (range.getClientRects) {
        range.collapse(true);
        const rects = range.getClientRects();
        const positioning =
          rects.length > 0
            ? { x: rects[0].left, y: rects[0].top }
            : { x: 0, y: 0 };

        return {
          ...dimensions,
          ...positioning,
          isInTargetElement,
          isIntersectingWithNodes,
          text,
        };
      }

      /**
       * Fall back to inserting a temporary element
       * Source: https://github.com/narative/gatsby-theme-novela/blob/e8e608098f9b9da59b8d09d133de6c70483e83ab/%40narative/gatsby-theme-novela/src/utils/index.ts
       */
      var span = window.document.createElement('span');
      if (span.getClientRects) {
        // Ensure span has dimensions and position by
        // adding a zero-width space character
        span.appendChild(window.document.createTextNode('\u200b'));
        range.insertNode(span);
        const rect = span.getClientRects()[0];
        const positioning = { x: rect.left, y: rect.top };

        var spanParent = span.parentNode;
        spanParent.removeChild(span);

        // Glue any broken text nodes back together
        spanParent.normalize();

        return {
          ...dimensions,
          ...positioning,
          isInTargetElement,
          isIntersectingWithNodes,
          text,
        };
      }
    }
  }
  // IE fallback
  else if (document.selection && document.selection.type !== 'Control') {
    const range = document.selection.createRange();
    const text = range.text;
    const parentElement = range.parentElement();

    const dimensions = {
      width: range.boundingWidth,
      height: range.boundingHeight,
    };
    range.collapse(true);

    return {
      ...dimensions,
      x: range.boundingLeft,
      y: range.boundingTop,
      isInTargetElement: targetElement
        ? isOrContains(parentElement, targetElement)
        : true,
      isIntersectingWithNodes: intersectingNodes
        ? intersectingNodes.some(node => isOrContains(parentElement, node))
        : false,
      text,
    };
  }
  return {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    isInTargetElement: true,
    isIntersectingWithNodes: false,
    text: '',
  };
}

function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

function getWindowDimensions() {
  if (typeof window === 'undefined') return { width: 0, height: 0 };

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  return {
    height,
    width,
  };
}

function defaultCalculatePosition({
  selectionArea,
  yOffset,
  xOffset,
  x,
  y,
  widthOfSelection,
}) {
  const selectionAreaBox = selectionArea.getBoundingClientRect();
  const selectionAreaStart = selectionAreaBox.x;
  const selectionAreaEnd = selectionAreaBox.x + selectionAreaBox.width;
  const maxSelectionWidth = selectionAreaEnd - selectionAreaStart;

  const top = y - yOffset;
  const left = x + widthOfSelection / 2 - xOffset / 2;

  if (widthOfSelection >= maxSelectionWidth / 2) {
    return {
      left: selectionAreaStart + maxSelectionWidth / 2 - xOffset / 2,
      top,
    };
  } else if (left <= selectionAreaStart) {
    return { left: x, top };
  } else if (left + xOffset >= selectionAreaEnd) {
    return {
      left: x + xOffset < selectionAreaEnd ? x : selectionAreaEnd - xOffset,
      top,
    };
  }
  return { left, top };
}

export default function TextSelectionPopover({
  targetRef,
  customPosition,
  calculatePosition,
  excludeQuery,
  excludeElements,
  renderPopover,
}) {
  const [text, setText] = useState('');
  const [{ left, top, show }, setPosition] = useState(DEFAULT_POSITION);

  useEffect(() => {
    const handlePopoverSetup = event => {
      if (
        event.keyCode !== undefined &&
        !NAVIGATION_KEY_CODES.includes(event.keyCode)
      )
        return;

      setTimeout(() => {
        const targetElement = targetRef.current;
        if (!targetElement) return setPosition(DEFAULT_POSITION);

        const {
          width,
          height,
          x,
          y: selectionY,
          isInTargetElement,
          isIntersectingWithNodes,
          text,
        } = getSelection({
          targetElement,
          intersectingNodes:
            excludeElements ||
            Array.from(document.querySelectorAll(excludeQuery)),
        });

        if (!isInTargetElement || isIntersectingWithNodes)
          return setPosition(DEFAULT_POSITION);

        setText(text);

        const {
          width: windowWidth,
          height: windowHeight,
        } = getWindowDimensions();

        const y = window.pageYOffset + selectionY;
        const position = calculatePosition
          ? calculatePosition({
              x,
              y,
              targetElement,
              widthOfSelection: width,
              heightOfSelection: height,
              yFromTopOfScreen: selectionY,
              windowWidth,
              windowHeight,
            })
          : defaultCalculatePosition({
              selectionArea: targetElement,
              yOffset: 0,
              xOffset: 0,
              x,
              y,
              widthOfSelection: width,
              ...(customPosition
                ? customPosition({
                    targetElement,
                    x,
                    y,
                    widthOfSelection: width,
                  })
                : {}),
            });

        setPosition({
          ...position,
          show: width > 1,
        });
      }, 0);
    };

    EVENTS.forEach(event => window.addEventListener(event, handlePopoverSetup));

    return () => {
      EVENTS.forEach(event =>
        window.removeEventListener(event, handlePopoverSetup),
      );
    };
  }, [show]);

  /**
   * Source: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
   */
  function handleCopyButtonClick() {
    const handleError = err => console.error('Could not copy text: ', err);

    if (!navigator.clipboard) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
      } catch (err) {
        handleError(err);
      }

      clearSelection();
      return document.body.removeChild(textArea);
    }

    clearSelection();
    return navigator.clipboard.writeText(text).catch(handleError);
  }

  const popoverProps = {
    left,
    top,
    show,
    text,
    onCopyButtonClick: handleCopyButtonClick,
  };

  return renderPopover(popoverProps);
}
