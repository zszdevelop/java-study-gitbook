/*!
  * PhotoSwipe 5.3.0 - https://photoswipe.com
  * (c) 2022 Dmytro Semenov
  */
function createElement(className, tagName, appendToEl) {
  const el = document.createElement(tagName || "div");
  if (className) {
    el.className = className;
  }
  if (appendToEl) {
    appendToEl.appendChild(el);
  }
  return el;
}
function equalizePoints(p1, p2) {
  p1.x = p2.x;
  p1.y = p2.y;
  if (p2.id !== void 0) {
    p1.id = p2.id;
  }
  return p1;
}
function roundPoint(p) {
  p.x = Math.round(p.x);
  p.y = Math.round(p.y);
}
function getDistanceBetween(p1, p2) {
  const x = Math.abs(p1.x - p2.x);
  const y = Math.abs(p1.y - p2.y);
  return Math.sqrt(x * x + y * y);
}
function pointsEqual(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
function toTransformString(x, y, scale) {
  let propValue = "translate3d(" + x + "px," + (y || 0) + "px,0)";
  if (scale !== void 0) {
    propValue += " scale3d(" + scale + "," + scale + ",1)";
  }
  return propValue;
}
function setTransform(el, x, y, scale) {
  el.style.transform = toTransformString(x, y, scale);
}
const defaultCSSEasing = "cubic-bezier(.4,0,.22,1)";
function setTransitionStyle(el, prop, duration, ease) {
  el.style.transition = prop ? prop + " " + duration + "ms " + (ease || defaultCSSEasing) : "none";
}
function setWidthHeight(el, w, h) {
  el.style.width = typeof w === "number" ? w + "px" : w;
  el.style.height = typeof h === "number" ? h + "px" : h;
}
function removeTransitionStyle(el) {
  setTransitionStyle(el);
}
function decodeImage(img) {
  if ("decode" in img) {
    return img.decode();
  }
  if (img.complete) {
    return Promise.resolve(img);
  }
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}
const LOAD_STATE = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function specialKeyUsed(e) {
  if (e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
    return true;
  }
}
function getElementsFromOption(option, legacySelector, parent = document) {
  let elements = [];
  if (option instanceof Element) {
    elements = [option];
  } else if (option instanceof NodeList || Array.isArray(option)) {
    elements = Array.from(option);
  } else {
    const selector = typeof option === "string" ? option : legacySelector;
    if (selector) {
      elements = Array.from(parent.querySelectorAll(selector));
    }
  }
  return elements;
}
function isSafari() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, "passive", {
    get: () => {
      supportsPassive = true;
    }
  }));
} catch (e) {
}
class DOMEvents {
  constructor() {
    this._pool = [];
  }
  add(target, type, listener, passive) {
    this._toggleListener(target, type, listener, passive);
  }
  remove(target, type, listener, passive) {
    this._toggleListener(target, type, listener, passive, true);
  }
  removeAll() {
    this._pool.forEach((poolItem) => {
      this._toggleListener(
        poolItem.target,
        poolItem.type,
        poolItem.listener,
        poolItem.passive,
        true,
        true
      );
    });
    this._pool = [];
  }
  _toggleListener(target, type, listener, passive, unbind, skipPool) {
    if (!target) {
      return;
    }
    const methodName = unbind ? "removeEventListener" : "addEventListener";
    const types = type.split(" ");
    types.forEach((eType) => {
      if (eType) {
        if (!skipPool) {
          if (unbind) {
            this._pool = this._pool.filter((poolItem) => {
              return poolItem.type !== eType || poolItem.listener !== listener || poolItem.target !== target;
            });
          } else {
            this._pool.push({
              target,
              type: eType,
              listener,
              passive
            });
          }
        }
        const eventOptions = supportsPassive ? { passive: passive || false } : false;
        target[methodName](
          eType,
          listener,
          eventOptions
        );
      }
    });
  }
}
function getViewportSize(options, pswp) {
  if (options.getViewportSizeFn) {
    const newViewportSize = options.getViewportSizeFn(options, pswp);
    if (newViewportSize) {
      return newViewportSize;
    }
  }
  return {
    x: document.documentElement.clientWidth,
    y: window.innerHeight
  };
}
function parsePaddingOption(prop, options, viewportSize, itemData, index) {
  let paddingValue;
  if (options.paddingFn) {
    paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];
  } else if (options.padding) {
    paddingValue = options.padding[prop];
  } else {
    const legacyPropName = "padding" + prop[0].toUpperCase() + prop.slice(1);
    if (options[legacyPropName]) {
      paddingValue = options[legacyPropName];
    }
  }
  return paddingValue || 0;
}
function getPanAreaSize(options, viewportSize, itemData, index) {
  return {
    x: viewportSize.x - parsePaddingOption("left", options, viewportSize, itemData, index) - parsePaddingOption("right", options, viewportSize, itemData, index),
    y: viewportSize.y - parsePaddingOption("top", options, viewportSize, itemData, index) - parsePaddingOption("bottom", options, viewportSize, itemData, index)
  };
}
class PanBounds {
  constructor(slide) {
    this.slide = slide;
    this.currZoomLevel = 1;
    this.center = {};
    this.max = {};
    this.min = {};
    this.reset();
  }
  update(currZoomLevel) {
    this.currZoomLevel = currZoomLevel;
    if (!this.slide.width) {
      this.reset();
    } else {
      this._updateAxis("x");
      this._updateAxis("y");
      this.slide.pswp.dispatch("calcBounds", { slide: this.slide });
    }
  }
  _updateAxis(axis) {
    const { pswp } = this.slide;
    const elSize = this.slide[axis === "x" ? "width" : "height"] * this.currZoomLevel;
    const paddingProp = axis === "x" ? "left" : "top";
    const padding = parsePaddingOption(
      paddingProp,
      pswp.options,
      pswp.viewportSize,
      this.slide.data,
      this.slide.index
    );
    const panAreaSize = this.slide.panAreaSize[axis];
    this.center[axis] = Math.round((panAreaSize - elSize) / 2) + padding;
    this.max[axis] = elSize > panAreaSize ? Math.round(panAreaSize - elSize) + padding : this.center[axis];
    this.min[axis] = elSize > panAreaSize ? padding : this.center[axis];
  }
  reset() {
    this.center.x = 0;
    this.center.y = 0;
    this.max.x = 0;
    this.max.y = 0;
    this.min.x = 0;
    this.min.y = 0;
  }
  correctPan(axis, panOffset) {
    return clamp(panOffset, this.max[axis], this.min[axis]);
  }
}
const MAX_IMAGE_WIDTH = 4e3;
class ZoomLevel {
  constructor(options, itemData, index, pswp) {
    this.pswp = pswp;
    this.options = options;
    this.itemData = itemData;
    this.index = index;
  }
  update(maxWidth, maxHeight, panAreaSize) {
    this.elementSize = {
      x: maxWidth,
      y: maxHeight
    };
    this.panAreaSize = panAreaSize;
    const hRatio = this.panAreaSize.x / this.elementSize.x;
    const vRatio = this.panAreaSize.y / this.elementSize.y;
    this.fit = Math.min(1, hRatio < vRatio ? hRatio : vRatio);
    this.fill = Math.min(1, hRatio > vRatio ? hRatio : vRatio);
    this.vFill = Math.min(1, vRatio);
    this.initial = this._getInitial();
    this.secondary = this._getSecondary();
    this.max = Math.max(
      this.initial,
      this.secondary,
      this._getMax()
    );
    this.min = Math.min(
      this.fit,
      this.initial,
      this.secondary
    );
    if (this.pswp) {
      this.pswp.dispatch("zoomLevelsUpdate", { zoomLevels: this, slideData: this.itemData });
    }
  }
  _parseZoomLevelOption(optionPrefix) {
    const optionName = optionPrefix + "ZoomLevel";
    const optionValue = this.options[optionName];
    if (!optionValue) {
      return;
    }
    if (typeof optionValue === "function") {
      return optionValue(this);
    }
    if (optionValue === "fill") {
      return this.fill;
    }
    if (optionValue === "fit") {
      return this.fit;
    }
    return Number(optionValue);
  }
  _getSecondary() {
    let currZoomLevel = this._parseZoomLevelOption("secondary");
    if (currZoomLevel) {
      return currZoomLevel;
    }
    currZoomLevel = Math.min(1, this.fit * 3);
    if (currZoomLevel * this.elementSize.x > MAX_IMAGE_WIDTH) {
      currZoomLevel = MAX_IMAGE_WIDTH / this.elementSize.x;
    }
    return currZoomLevel;
  }
  _getInitial() {
    return this._parseZoomLevelOption("initial") || this.fit;
  }
  _getMax() {
    const currZoomLevel = this._parseZoomLevelOption("max");
    if (currZoomLevel) {
      return currZoomLevel;
    }
    return Math.max(1, this.fit * 4);
  }
}
class Slide {
  constructor(data, index, pswp) {
    this.data = data;
    this.index = index;
    this.pswp = pswp;
    this.isActive = index === pswp.currIndex;
    this.currentResolution = 0;
    this.panAreaSize = {};
    this.isFirstSlide = this.isActive && !pswp.opener.isOpen;
    this.zoomLevels = new ZoomLevel(pswp.options, data, index, pswp);
    this.pswp.dispatch("gettingData", {
      slide: this,
      data: this.data,
      index
    });
    this.pan = {
      x: 0,
      y: 0
    };
    this.content = this.pswp.contentLoader.getContentBySlide(this);
    this.container = createElement("pswp__zoom-wrap");
    this.currZoomLevel = 1;
    this.width = this.content.width;
    this.height = this.content.height;
    this.bounds = new PanBounds(this);
    this.prevDisplayedWidth = -1;
    this.prevDisplayedHeight = -1;
    this.pswp.dispatch("slideInit", { slide: this });
  }
  setIsActive(isActive) {
    if (isActive && !this.isActive) {
      this.activate();
    } else if (!isActive && this.isActive) {
      this.deactivate();
    }
  }
  append(holderElement) {
    this.holderElement = holderElement;
    this.container.style.transformOrigin = "0 0";
    if (!this.data) {
      return;
    }
    this.calculateSize();
    this.load();
    this.updateContentSize();
    this.appendHeavy();
    this.holderElement.appendChild(this.container);
    this.zoomAndPanToInitial();
    this.pswp.dispatch("firstZoomPan", { slide: this });
    this.applyCurrentZoomPan();
    this.pswp.dispatch("afterSetContent", { slide: this });
    if (this.isActive) {
      this.activate();
    }
  }
  load() {
    this.content.load();
    this.pswp.dispatch("slideLoad", { slide: this });
  }
  appendHeavy() {
    const { pswp } = this;
    const appendHeavyNearby = true;
    if (this.heavyAppended || !pswp.opener.isOpen || pswp.mainScroll.isShifted() || !this.isActive && !appendHeavyNearby) {
      return;
    }
    if (this.pswp.dispatch("appendHeavy", { slide: this }).defaultPrevented) {
      return;
    }
    this.heavyAppended = true;
    this.content.append();
    this.pswp.dispatch("appendHeavyContent", { slide: this });
  }
  activate() {
    this.isActive = true;
    this.appendHeavy();
    this.content.activate();
    this.pswp.dispatch("slideActivate", { slide: this });
  }
  deactivate() {
    this.isActive = false;
    this.content.deactivate();
    if (this.currZoomLevel !== this.zoomLevels.initial) {
      this.calculateSize();
    }
    this.currentResolution = 0;
    this.zoomAndPanToInitial();
    this.applyCurrentZoomPan();
    this.updateContentSize();
    this.pswp.dispatch("slideDeactivate", { slide: this });
  }
  destroy() {
    this.content.hasSlide = false;
    this.content.remove();
    this.container.remove();
    this.pswp.dispatch("slideDestroy", { slide: this });
  }
  resize() {
    if (this.currZoomLevel === this.zoomLevels.initial || !this.isActive) {
      this.calculateSize();
      this.currentResolution = 0;
      this.zoomAndPanToInitial();
      this.applyCurrentZoomPan();
      this.updateContentSize();
    } else {
      this.calculateSize();
      this.bounds.update(this.currZoomLevel);
      this.panTo(this.pan.x, this.pan.y);
    }
  }
  updateContentSize(force) {
    const scaleMultiplier = this.currentResolution || this.zoomLevels.initial;
    if (!scaleMultiplier) {
      return;
    }
    const width = Math.round(this.width * scaleMultiplier) || this.pswp.viewportSize.x;
    const height = Math.round(this.height * scaleMultiplier) || this.pswp.viewportSize.y;
    if (!this.sizeChanged(width, height) && !force) {
      return;
    }
    this.content.setDisplayedSize(width, height);
  }
  sizeChanged(width, height) {
    if (width !== this.prevDisplayedWidth || height !== this.prevDisplayedHeight) {
      this.prevDisplayedWidth = width;
      this.prevDisplayedHeight = height;
      return true;
    }
    return false;
  }
  getPlaceholderElement() {
    if (this.content.placeholder) {
      return this.content.placeholder.element;
    }
  }
  zoomTo(destZoomLevel, centerPoint, transitionDuration, ignoreBounds) {
    const { pswp } = this;
    if (!this.isZoomable() || pswp.mainScroll.isShifted()) {
      return;
    }
    pswp.dispatch("beforeZoomTo", {
      destZoomLevel,
      centerPoint,
      transitionDuration
    });
    pswp.animations.stopAllPan();
    const prevZoomLevel = this.currZoomLevel;
    if (!ignoreBounds) {
      destZoomLevel = clamp(destZoomLevel, this.zoomLevels.min, this.zoomLevels.max);
    }
    this.setZoomLevel(destZoomLevel);
    this.pan.x = this.calculateZoomToPanOffset("x", centerPoint, prevZoomLevel);
    this.pan.y = this.calculateZoomToPanOffset("y", centerPoint, prevZoomLevel);
    roundPoint(this.pan);
    const finishTransition = () => {
      this._setResolution(destZoomLevel);
      this.applyCurrentZoomPan();
    };
    if (!transitionDuration) {
      finishTransition();
    } else {
      pswp.animations.startTransition({
        isPan: true,
        name: "zoomTo",
        target: this.container,
        transform: this.getCurrentTransform(),
        onComplete: finishTransition,
        duration: transitionDuration,
        easing: pswp.options.easing
      });
    }
  }
  toggleZoom(centerPoint) {
    this.zoomTo(
      this.currZoomLevel === this.zoomLevels.initial ? this.zoomLevels.secondary : this.zoomLevels.initial,
      centerPoint,
      this.pswp.options.zoomAnimationDuration
    );
  }
  setZoomLevel(currZoomLevel) {
    this.currZoomLevel = currZoomLevel;
    this.bounds.update(this.currZoomLevel);
  }
  calculateZoomToPanOffset(axis, point, prevZoomLevel) {
    const totalPanDistance = this.bounds.max[axis] - this.bounds.min[axis];
    if (totalPanDistance === 0) {
      return this.bounds.center[axis];
    }
    if (!point) {
      point = this.pswp.getViewportCenterPoint();
    }
    const zoomFactor = this.currZoomLevel / prevZoomLevel;
    return this.bounds.correctPan(
      axis,
      (this.pan[axis] - point[axis]) * zoomFactor + point[axis]
    );
  }
  panTo(panX, panY) {
    this.pan.x = this.bounds.correctPan("x", panX);
    this.pan.y = this.bounds.correctPan("y", panY);
    this.applyCurrentZoomPan();
  }
  isPannable() {
    return this.width && this.currZoomLevel > this.zoomLevels.fit;
  }
  isZoomable() {
    return this.width && this.content.isZoomable();
  }
  applyCurrentZoomPan() {
    this._applyZoomTransform(this.pan.x, this.pan.y, this.currZoomLevel);
    if (this === this.pswp.currSlide) {
      this.pswp.dispatch("zoomPanUpdate", { slide: this });
    }
  }
  zoomAndPanToInitial() {
    this.currZoomLevel = this.zoomLevels.initial;
    this.bounds.update(this.currZoomLevel);
    equalizePoints(this.pan, this.bounds.center);
    this.pswp.dispatch("initialZoomPan", { slide: this });
  }
  _applyZoomTransform(x, y, zoom) {
    zoom /= this.currentResolution || this.zoomLevels.initial;
    setTransform(this.container, x, y, zoom);
  }
  calculateSize() {
    const { pswp } = this;
    equalizePoints(
      this.panAreaSize,
      getPanAreaSize(pswp.options, pswp.viewportSize, this.data, this.index)
    );
    this.zoomLevels.update(this.width, this.height, this.panAreaSize);
    pswp.dispatch("calcSlideSize", {
      slide: this
    });
  }
  getCurrentTransform() {
    const scale = this.currZoomLevel / (this.currentResolution || this.zoomLevels.initial);
    return toTransformString(this.pan.x, this.pan.y, scale);
  }
  _setResolution(newResolution) {
    if (newResolution === this.currentResolution) {
      return;
    }
    this.currentResolution = newResolution;
    this.updateContentSize();
    this.pswp.dispatch("resolutionChanged");
  }
}
const PAN_END_FRICTION = 0.35;
const VERTICAL_DRAG_FRICTION = 0.6;
const MIN_RATIO_TO_CLOSE = 0.4;
const MIN_NEXT_SLIDE_SPEED = 0.5;
function project(initialVelocity, decelerationRate) {
  return initialVelocity * decelerationRate / (1 - decelerationRate);
}
class DragHandler {
  constructor(gestures) {
    this.gestures = gestures;
    this.pswp = gestures.pswp;
    this.startPan = {};
  }
  start() {
    equalizePoints(this.startPan, this.pswp.currSlide.pan);
    this.pswp.animations.stopAll();
  }
  change() {
    const { p1, prevP1, dragAxis, pswp } = this.gestures;
    const { currSlide } = pswp;
    if (dragAxis === "y" && pswp.options.closeOnVerticalDrag && currSlide.currZoomLevel <= currSlide.zoomLevels.fit && !this.gestures.isMultitouch) {
      const panY = currSlide.pan.y + (p1.y - prevP1.y);
      if (!pswp.dispatch("verticalDrag", { panY }).defaultPrevented) {
        this._setPanWithFriction("y", panY, VERTICAL_DRAG_FRICTION);
        const bgOpacity = 1 - Math.abs(this._getVerticalDragRatio(currSlide.pan.y));
        pswp.applyBgOpacity(bgOpacity);
        currSlide.applyCurrentZoomPan();
      }
    } else {
      const mainScrollChanged = this._panOrMoveMainScroll("x");
      if (!mainScrollChanged) {
        this._panOrMoveMainScroll("y");
        roundPoint(currSlide.pan);
        currSlide.applyCurrentZoomPan();
      }
    }
  }
  end() {
    const { pswp, velocity } = this.gestures;
    const { mainScroll } = pswp;
    let indexDiff = 0;
    pswp.animations.stopAll();
    if (mainScroll.isShifted()) {
      const mainScrollShiftDiff = mainScroll.x - mainScroll.getCurrSlideX();
      const currentSlideVisibilityRatio = mainScrollShiftDiff / pswp.viewportSize.x;
      if (velocity.x < -MIN_NEXT_SLIDE_SPEED && currentSlideVisibilityRatio < 0 || velocity.x < 0.1 && currentSlideVisibilityRatio < -0.5) {
        indexDiff = 1;
        velocity.x = Math.min(velocity.x, 0);
      } else if (velocity.x > MIN_NEXT_SLIDE_SPEED && currentSlideVisibilityRatio > 0 || velocity.x > -0.1 && currentSlideVisibilityRatio > 0.5) {
        indexDiff = -1;
        velocity.x = Math.max(velocity.x, 0);
      }
      mainScroll.moveIndexBy(indexDiff, true, velocity.x);
    }
    if (pswp.currSlide.currZoomLevel > pswp.currSlide.zoomLevels.max || this.gestures.isMultitouch) {
      this.gestures.zoomLevels.correctZoomPan(true);
    } else {
      this._finishPanGestureForAxis("x");
      this._finishPanGestureForAxis("y");
    }
  }
  _finishPanGestureForAxis(axis) {
    const { pswp } = this;
    const { currSlide } = pswp;
    const { velocity } = this.gestures;
    const { pan, bounds } = currSlide;
    const panPos = pan[axis];
    const restoreBgOpacity = pswp.bgOpacity < 1 && axis === "y";
    const decelerationRate = 0.995;
    const projectedPosition = panPos + project(velocity[axis], decelerationRate);
    if (restoreBgOpacity) {
      const vDragRatio = this._getVerticalDragRatio(panPos);
      const projectedVDragRatio = this._getVerticalDragRatio(projectedPosition);
      if (vDragRatio < 0 && projectedVDragRatio < -MIN_RATIO_TO_CLOSE || vDragRatio > 0 && projectedVDragRatio > MIN_RATIO_TO_CLOSE) {
        pswp.close();
        return;
      }
    }
    const correctedPanPosition = bounds.correctPan(axis, projectedPosition);
    if (panPos === correctedPanPosition) {
      return;
    }
    const dampingRatio = correctedPanPosition === projectedPosition ? 1 : 0.82;
    const initialBgOpacity = pswp.bgOpacity;
    const totalPanDist = correctedPanPosition - panPos;
    pswp.animations.startSpring({
      name: "panGesture" + axis,
      isPan: true,
      start: panPos,
      end: correctedPanPosition,
      velocity: velocity[axis],
      dampingRatio,
      onUpdate: (pos) => {
        if (restoreBgOpacity && pswp.bgOpacity < 1) {
          const animationProgressRatio = 1 - (correctedPanPosition - pos) / totalPanDist;
          pswp.applyBgOpacity(clamp(
            initialBgOpacity + (1 - initialBgOpacity) * animationProgressRatio,
            0,
            1
          ));
        }
        pan[axis] = Math.floor(pos);
        currSlide.applyCurrentZoomPan();
      }
    });
  }
  _panOrMoveMainScroll(axis) {
    const { p1, pswp, dragAxis, prevP1, isMultitouch } = this.gestures;
    const { currSlide, mainScroll } = pswp;
    const delta = p1[axis] - prevP1[axis];
    const newMainScrollX = mainScroll.x + delta;
    if (!delta) {
      return;
    }
    if (axis === "x" && !currSlide.isPannable() && !isMultitouch) {
      mainScroll.moveTo(newMainScrollX, true);
      return true;
    }
    const { bounds } = currSlide;
    const newPan = currSlide.pan[axis] + delta;
    if (pswp.options.allowPanToNext && dragAxis === "x" && axis === "x" && !isMultitouch) {
      const currSlideMainScrollX = mainScroll.getCurrSlideX();
      const mainScrollShiftDiff = mainScroll.x - currSlideMainScrollX;
      const isLeftToRight = delta > 0;
      const isRightToLeft = !isLeftToRight;
      if (newPan > bounds.min[axis] && isLeftToRight) {
        const wasAtMinPanPosition = bounds.min[axis] <= this.startPan[axis];
        if (wasAtMinPanPosition) {
          mainScroll.moveTo(newMainScrollX, true);
          return true;
        } else {
          this._setPanWithFriction(axis, newPan);
        }
      } else if (newPan < bounds.max[axis] && isRightToLeft) {
        const wasAtMaxPanPosition = this.startPan[axis] <= bounds.max[axis];
        if (wasAtMaxPanPosition) {
          mainScroll.moveTo(newMainScrollX, true);
          return true;
        } else {
          this._setPanWithFriction(axis, newPan);
        }
      } else {
        if (mainScrollShiftDiff !== 0) {
          if (mainScrollShiftDiff > 0) {
            mainScroll.moveTo(Math.max(newMainScrollX, currSlideMainScrollX), true);
            return true;
          } else if (mainScrollShiftDiff < 0) {
            mainScroll.moveTo(Math.min(newMainScrollX, currSlideMainScrollX), true);
            return true;
          }
        } else {
          this._setPanWithFriction(axis, newPan);
        }
      }
    } else {
      if (axis === "y") {
        if (!mainScroll.isShifted() && bounds.min.y !== bounds.max.y) {
          this._setPanWithFriction(axis, newPan);
        }
      } else {
        this._setPanWithFriction(axis, newPan);
      }
    }
  }
  _getVerticalDragRatio(panY) {
    return (panY - this.pswp.currSlide.bounds.center.y) / (this.pswp.viewportSize.y / 3);
  }
  _setPanWithFriction(axis, potentialPan, customFriction) {
    const { pan, bounds } = this.pswp.currSlide;
    const correctedPan = bounds.correctPan(axis, potentialPan);
    if (correctedPan !== potentialPan || customFriction) {
      const delta = Math.round(potentialPan - pan[axis]);
      pan[axis] += delta * (customFriction || PAN_END_FRICTION);
    } else {
      pan[axis] = potentialPan;
    }
  }
}
const UPPER_ZOOM_FRICTION = 0.05;
const LOWER_ZOOM_FRICTION = 0.15;
function getZoomPointsCenter(p, p1, p2) {
  p.x = (p1.x + p2.x) / 2;
  p.y = (p1.y + p2.y) / 2;
  return p;
}
class ZoomHandler {
  constructor(gestures) {
    this.gestures = gestures;
    this.pswp = this.gestures.pswp;
    this._startPan = {};
    this._startZoomPoint = {};
    this._zoomPoint = {};
  }
  start() {
    this._startZoomLevel = this.pswp.currSlide.currZoomLevel;
    equalizePoints(this._startPan, this.pswp.currSlide.pan);
    this.pswp.animations.stopAllPan();
    this._wasOverFitZoomLevel = false;
  }
  change() {
    const { p1, startP1, p2, startP2, pswp } = this.gestures;
    const { currSlide } = pswp;
    const minZoomLevel = currSlide.zoomLevels.min;
    const maxZoomLevel = currSlide.zoomLevels.max;
    if (!currSlide.isZoomable() || pswp.mainScroll.isShifted()) {
      return;
    }
    getZoomPointsCenter(this._startZoomPoint, startP1, startP2);
    getZoomPointsCenter(this._zoomPoint, p1, p2);
    let currZoomLevel = 1 / getDistanceBetween(startP1, startP2) * getDistanceBetween(p1, p2) * this._startZoomLevel;
    if (currZoomLevel > currSlide.zoomLevels.initial + currSlide.zoomLevels.initial / 15) {
      this._wasOverFitZoomLevel = true;
    }
    if (currZoomLevel < minZoomLevel) {
      if (pswp.options.pinchToClose && !this._wasOverFitZoomLevel && this._startZoomLevel <= currSlide.zoomLevels.initial) {
        const bgOpacity = 1 - (minZoomLevel - currZoomLevel) / (minZoomLevel / 1.2);
        if (!pswp.dispatch("pinchClose", { bgOpacity }).defaultPrevented) {
          pswp.applyBgOpacity(bgOpacity);
        }
      } else {
        currZoomLevel = minZoomLevel - (minZoomLevel - currZoomLevel) * LOWER_ZOOM_FRICTION;
      }
    } else if (currZoomLevel > maxZoomLevel) {
      currZoomLevel = maxZoomLevel + (currZoomLevel - maxZoomLevel) * UPPER_ZOOM_FRICTION;
    }
    currSlide.pan.x = this._calculatePanForZoomLevel("x", currZoomLevel);
    currSlide.pan.y = this._calculatePanForZoomLevel("y", currZoomLevel);
    currSlide.setZoomLevel(currZoomLevel);
    currSlide.applyCurrentZoomPan();
  }
  end() {
    const { pswp } = this;
    const { currSlide } = pswp;
    if (currSlide.currZoomLevel < currSlide.zoomLevels.initial && !this._wasOverFitZoomLevel && pswp.options.pinchToClose) {
      pswp.close();
    } else {
      this.correctZoomPan();
    }
  }
  _calculatePanForZoomLevel(axis, currZoomLevel) {
    const zoomFactor = currZoomLevel / this._startZoomLevel;
    return this._zoomPoint[axis] - (this._startZoomPoint[axis] - this._startPan[axis]) * zoomFactor;
  }
  correctZoomPan(ignoreGesture) {
    const { pswp } = this;
    const { currSlide } = pswp;
    if (!currSlide.isZoomable()) {
      return;
    }
    if (this._zoomPoint.x === void 0) {
      ignoreGesture = true;
    }
    const prevZoomLevel = currSlide.currZoomLevel;
    let destinationZoomLevel;
    let currZoomLevelNeedsChange = true;
    if (prevZoomLevel < currSlide.zoomLevels.initial) {
      destinationZoomLevel = currSlide.zoomLevels.initial;
    } else if (prevZoomLevel > currSlide.zoomLevels.max) {
      destinationZoomLevel = currSlide.zoomLevels.max;
    } else {
      currZoomLevelNeedsChange = false;
      destinationZoomLevel = prevZoomLevel;
    }
    const initialBgOpacity = pswp.bgOpacity;
    const restoreBgOpacity = pswp.bgOpacity < 1;
    const initialPan = equalizePoints({}, currSlide.pan);
    let destinationPan = equalizePoints({}, initialPan);
    if (ignoreGesture) {
      this._zoomPoint.x = 0;
      this._zoomPoint.y = 0;
      this._startZoomPoint.x = 0;
      this._startZoomPoint.y = 0;
      this._startZoomLevel = prevZoomLevel;
      equalizePoints(this._startPan, initialPan);
    }
    if (currZoomLevelNeedsChange) {
      destinationPan = {
        x: this._calculatePanForZoomLevel("x", destinationZoomLevel),
        y: this._calculatePanForZoomLevel("y", destinationZoomLevel)
      };
    }
    currSlide.setZoomLevel(destinationZoomLevel);
    destinationPan = {
      x: currSlide.bounds.correctPan("x", destinationPan.x),
      y: currSlide.bounds.correctPan("y", destinationPan.y)
    };
    currSlide.setZoomLevel(prevZoomLevel);
    let panNeedsChange = true;
    if (pointsEqual(destinationPan, initialPan)) {
      panNeedsChange = false;
    }
    if (!panNeedsChange && !currZoomLevelNeedsChange && !restoreBgOpacity) {
      currSlide._setResolution(destinationZoomLevel);
      currSlide.applyCurrentZoomPan();
      return;
    }
    pswp.animations.stopAllPan();
    pswp.animations.startSpring({
      isPan: true,
      start: 0,
      end: 1e3,
      velocity: 0,
      dampingRatio: 1,
      naturalFrequency: 40,
      onUpdate: (now) => {
        now /= 1e3;
        if (panNeedsChange || currZoomLevelNeedsChange) {
          if (panNeedsChange) {
            currSlide.pan.x = initialPan.x + (destinationPan.x - initialPan.x) * now;
            currSlide.pan.y = initialPan.y + (destinationPan.y - initialPan.y) * now;
          }
          if (currZoomLevelNeedsChange) {
            const newZoomLevel = prevZoomLevel + (destinationZoomLevel - prevZoomLevel) * now;
            currSlide.setZoomLevel(newZoomLevel);
          }
          currSlide.applyCurrentZoomPan();
        }
        if (restoreBgOpacity && pswp.bgOpacity < 1) {
          pswp.applyBgOpacity(clamp(
            initialBgOpacity + (1 - initialBgOpacity) * now,
            0,
            1
          ));
        }
      },
      onComplete: () => {
        currSlide._setResolution(destinationZoomLevel);
        currSlide.applyCurrentZoomPan();
      }
    });
  }
}
function didTapOnMainContent(event) {
  return !!event.target.closest(".pswp__container");
}
class TapHandler {
  constructor(gestures) {
    this.gestures = gestures;
  }
  click(point, originalEvent) {
    const targetClassList = originalEvent.target.classList;
    const isImageClick = targetClassList.contains("pswp__img");
    const isBackgroundClick = targetClassList.contains("pswp__item") || targetClassList.contains("pswp__zoom-wrap");
    if (isImageClick) {
      this._doClickOrTapAction("imageClick", point, originalEvent);
    } else if (isBackgroundClick) {
      this._doClickOrTapAction("bgClick", point, originalEvent);
    }
  }
  tap(point, originalEvent) {
    if (didTapOnMainContent(originalEvent)) {
      this._doClickOrTapAction("tap", point, originalEvent);
    }
  }
  doubleTap(point, originalEvent) {
    if (didTapOnMainContent(originalEvent)) {
      this._doClickOrTapAction("doubleTap", point, originalEvent);
    }
  }
  _doClickOrTapAction(actionName, point, originalEvent) {
    const { pswp } = this.gestures;
    const { currSlide } = pswp;
    const actionFullName = actionName + "Action";
    const optionValue = pswp.options[actionFullName];
    if (pswp.dispatch(actionFullName, { point, originalEvent }).defaultPrevented) {
      return;
    }
    if (typeof optionValue === "function") {
      optionValue.call(pswp, point, originalEvent);
      return;
    }
    switch (optionValue) {
      case "close":
      case "next":
        pswp[optionValue]();
        break;
      case "zoom":
        currSlide.toggleZoom(point);
        break;
      case "zoom-or-close":
        if (currSlide.isZoomable() && currSlide.zoomLevels.secondary !== currSlide.zoomLevels.initial) {
          currSlide.toggleZoom(point);
        } else if (pswp.options.clickToCloseNonZoomable) {
          pswp.close();
        }
        break;
      case "toggle-controls":
        this.gestures.pswp.element.classList.toggle("pswp--ui-visible");
        break;
    }
  }
}
const AXIS_SWIPE_HYSTERISIS = 10;
const DOUBLE_TAP_DELAY = 300;
const MIN_TAP_DISTANCE = 25;
class Gestures {
  constructor(pswp) {
    this.pswp = pswp;
    this.dragAxis = void 0;
    this.p1 = {};
    this.p2 = {};
    this.prevP1 = {};
    this.prevP2 = {};
    this.startP1 = {};
    this.startP2 = {};
    this.velocity = {};
    this._lastStartP1 = {};
    this._intervalP1 = {};
    this._numActivePoints = 0;
    this._ongoingPointers = [];
    this._touchEventEnabled = "ontouchstart" in window;
    this._pointerEventEnabled = !!window.PointerEvent;
    this.supportsTouch = this._touchEventEnabled || this._pointerEventEnabled && navigator.maxTouchPoints > 1;
    if (!this.supportsTouch) {
      pswp.options.allowPanToNext = false;
    }
    this.drag = new DragHandler(this);
    this.zoomLevels = new ZoomHandler(this);
    this.tapHandler = new TapHandler(this);
    pswp.on("bindEvents", () => {
      pswp.events.add(pswp.scrollWrap, "click", (e) => this._onClick(e));
      if (this._pointerEventEnabled) {
        this._bindEvents("pointer", "down", "up", "cancel");
      } else if (this._touchEventEnabled) {
        this._bindEvents("touch", "start", "end", "cancel");
        pswp.scrollWrap.ontouchmove = () => {
        };
        pswp.scrollWrap.ontouchend = () => {
        };
      } else {
        this._bindEvents("mouse", "down", "up");
      }
    });
  }
  _bindEvents(pref, down, up, cancel) {
    const { pswp } = this;
    const { events } = pswp;
    const cancelEvent = cancel ? pref + cancel : "";
    events.add(pswp.scrollWrap, pref + down, this.onPointerDown.bind(this));
    events.add(window, pref + "move", this.onPointerMove.bind(this));
    events.add(window, pref + up, this.onPointerUp.bind(this));
    if (cancelEvent) {
      events.add(pswp.scrollWrap, cancelEvent, this.onPointerUp.bind(this));
    }
  }
  onPointerDown(e) {
    let isMousePointer;
    if (e.type === "mousedown" || e.pointerType === "mouse") {
      isMousePointer = true;
    }
    if (isMousePointer && e.button > 0) {
      return;
    }
    const { pswp } = this;
    if (!pswp.opener.isOpen) {
      e.preventDefault();
      return;
    }
    if (pswp.dispatch("pointerDown", { originalEvent: e }).defaultPrevented) {
      return;
    }
    if (isMousePointer) {
      pswp.mouseDetected();
      this._preventPointerEventBehaviour(e);
    }
    pswp.animations.stopAll();
    this._updatePoints(e, "down");
    this.pointerDown = true;
    if (this._numActivePoints === 1) {
      this.dragAxis = null;
      equalizePoints(this.startP1, this.p1);
    }
    if (this._numActivePoints > 1) {
      this._clearTapTimer();
      this.isMultitouch = true;
    } else {
      this.isMultitouch = false;
    }
  }
  onPointerMove(e) {
    e.preventDefault();
    if (!this._numActivePoints) {
      return;
    }
    this._updatePoints(e, "move");
    if (this.pswp.dispatch("pointerMove", { originalEvent: e }).defaultPrevented) {
      return;
    }
    if (this._numActivePoints === 1 && !this.isDragging) {
      if (!this.dragAxis) {
        this._calculateDragDirection();
      }
      if (this.dragAxis && !this.isDragging) {
        if (this.isZooming) {
          this.isZooming = false;
          this.zoomLevels.end();
        }
        this.isDragging = true;
        this._clearTapTimer();
        this._updateStartPoints();
        this._intervalTime = Date.now();
        this._velocityCalculated = false;
        equalizePoints(this._intervalP1, this.p1);
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.drag.start();
        this._rafStopLoop();
        this._rafRenderLoop();
      }
    } else if (this._numActivePoints > 1 && !this.isZooming) {
      this._finishDrag();
      this.isZooming = true;
      this._updateStartPoints();
      this.zoomLevels.start();
      this._rafStopLoop();
      this._rafRenderLoop();
    }
  }
  _finishDrag() {
    if (this.isDragging) {
      this.isDragging = false;
      if (!this._velocityCalculated) {
        this._updateVelocity(true);
      }
      this.drag.end();
      this.dragAxis = null;
    }
  }
  onPointerUp(e) {
    if (!this._numActivePoints) {
      return;
    }
    this._updatePoints(e, "up");
    if (this.pswp.dispatch("pointerUp", { originalEvent: e }).defaultPrevented) {
      return;
    }
    if (this._numActivePoints === 0) {
      this.pointerDown = false;
      this._rafStopLoop();
      if (this.isDragging) {
        this._finishDrag();
      } else if (!this.isZooming && !this.isMultitouch) {
        this._finishTap(e);
      }
    }
    if (this._numActivePoints < 2 && this.isZooming) {
      this.isZooming = false;
      this.zoomLevels.end();
      if (this._numActivePoints === 1) {
        this.dragAxis = null;
        this._updateStartPoints();
      }
    }
  }
  _rafRenderLoop() {
    if (this.isDragging || this.isZooming) {
      this._updateVelocity();
      if (this.isDragging) {
        if (!pointsEqual(this.p1, this.prevP1)) {
          this.drag.change();
        }
      } else {
        if (!pointsEqual(this.p1, this.prevP1) || !pointsEqual(this.p2, this.prevP2)) {
          this.zoomLevels.change();
        }
      }
      this._updatePrevPoints();
      this.raf = requestAnimationFrame(this._rafRenderLoop.bind(this));
    }
  }
  _updateVelocity(force) {
    const time = Date.now();
    const duration = time - this._intervalTime;
    if (duration < 50 && !force) {
      return;
    }
    this.velocity.x = this._getVelocity("x", duration);
    this.velocity.y = this._getVelocity("y", duration);
    this._intervalTime = time;
    equalizePoints(this._intervalP1, this.p1);
    this._velocityCalculated = true;
  }
  _finishTap(e) {
    const { mainScroll } = this.pswp;
    if (mainScroll.isShifted()) {
      mainScroll.moveIndexBy(0, true);
      return;
    }
    if (e.type.indexOf("cancel") > 0) {
      return;
    }
    if (e.type === "mouseup" || e.pointerType === "mouse") {
      this.tapHandler.click(this.startP1, e);
      return;
    }
    const tapDelay = this.pswp.options.doubleTapAction ? DOUBLE_TAP_DELAY : 0;
    if (this._tapTimer) {
      this._clearTapTimer();
      if (getDistanceBetween(this._lastStartP1, this.startP1) < MIN_TAP_DISTANCE) {
        this.tapHandler.doubleTap(this.startP1, e);
      }
    } else {
      equalizePoints(this._lastStartP1, this.startP1);
      this._tapTimer = setTimeout(() => {
        this.tapHandler.tap(this.startP1, e);
        this._clearTapTimer();
      }, tapDelay);
    }
  }
  _clearTapTimer() {
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
  }
  _getVelocity(axis, duration) {
    const displacement = this.p1[axis] - this._intervalP1[axis];
    if (Math.abs(displacement) > 1 && duration > 5) {
      return displacement / duration;
    }
    return 0;
  }
  _rafStopLoop() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
  }
  _preventPointerEventBehaviour(e) {
    e.preventDefault();
    return true;
  }
  _updatePoints(e, pointerType) {
    if (this._pointerEventEnabled) {
      const pointerEvent = e;
      const pointerIndex = this._ongoingPointers.findIndex((ongoingPoiner) => {
        return ongoingPoiner.id === pointerEvent.pointerId;
      });
      if (pointerType === "up" && pointerIndex > -1) {
        this._ongoingPointers.splice(pointerIndex, 1);
      } else if (pointerType === "down" && pointerIndex === -1) {
        this._ongoingPointers.push(this._convertEventPosToPoint(pointerEvent, {}));
      } else if (pointerIndex > -1) {
        this._convertEventPosToPoint(pointerEvent, this._ongoingPointers[pointerIndex]);
      }
      this._numActivePoints = this._ongoingPointers.length;
      if (this._numActivePoints > 0) {
        equalizePoints(this.p1, this._ongoingPointers[0]);
      }
      if (this._numActivePoints > 1) {
        equalizePoints(this.p2, this._ongoingPointers[1]);
      }
    } else {
      const touchEvent = e;
      this._numActivePoints = 0;
      if (touchEvent.type.indexOf("touch") > -1) {
        if (touchEvent.touches && touchEvent.touches.length > 0) {
          this._convertEventPosToPoint(touchEvent.touches[0], this.p1);
          this._numActivePoints++;
          if (touchEvent.touches.length > 1) {
            this._convertEventPosToPoint(touchEvent.touches[1], this.p2);
            this._numActivePoints++;
          }
        }
      } else {
        this._convertEventPosToPoint(e, this.p1);
        if (pointerType === "up") {
          this._numActivePoints = 0;
        } else {
          this._numActivePoints++;
        }
      }
    }
  }
  _updatePrevPoints() {
    equalizePoints(this.prevP1, this.p1);
    equalizePoints(this.prevP2, this.p2);
  }
  _updateStartPoints() {
    equalizePoints(this.startP1, this.p1);
    equalizePoints(this.startP2, this.p2);
    this._updatePrevPoints();
  }
  _calculateDragDirection() {
    if (this.pswp.mainScroll.isShifted()) {
      this.dragAxis = "x";
    } else {
      const diff = Math.abs(this.p1.x - this.startP1.x) - Math.abs(this.p1.y - this.startP1.y);
      if (diff !== 0) {
        const axisToCheck = diff > 0 ? "x" : "y";
        if (Math.abs(this.p1[axisToCheck] - this.startP1[axisToCheck]) >= AXIS_SWIPE_HYSTERISIS) {
          this.dragAxis = axisToCheck;
        }
      }
    }
  }
  _convertEventPosToPoint(e, p) {
    p.x = e.pageX - this.pswp.offset.x;
    p.y = e.pageY - this.pswp.offset.y;
    if ("pointerId" in e) {
      p.id = e.pointerId;
    } else if (e.identifier !== void 0) {
      p.id = e.identifier;
    }
    return p;
  }
  _onClick(e) {
    if (this.pswp.mainScroll.isShifted()) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
const MAIN_SCROLL_END_FRICTION = 0.35;
class MainScroll {
  constructor(pswp) {
    this.pswp = pswp;
    this.x = 0;
    this.slideWidth = void 0;
    this.itemHolders = void 0;
    this.resetPosition();
  }
  resize(resizeSlides) {
    const { pswp } = this;
    const newSlideWidth = Math.round(
      pswp.viewportSize.x + pswp.viewportSize.x * pswp.options.spacing
    );
    const slideWidthChanged = newSlideWidth !== this.slideWidth;
    if (slideWidthChanged) {
      this.slideWidth = newSlideWidth;
      this.moveTo(this.getCurrSlideX());
    }
    this.itemHolders.forEach((itemHolder, index) => {
      if (slideWidthChanged) {
        setTransform(itemHolder.el, (index + this._containerShiftIndex) * this.slideWidth);
      }
      if (resizeSlides && itemHolder.slide) {
        itemHolder.slide.resize();
      }
    });
  }
  resetPosition() {
    this._currPositionIndex = 0;
    this._prevPositionIndex = 0;
    this.slideWidth = 0;
    this._containerShiftIndex = -1;
  }
  appendHolders() {
    this.itemHolders = [];
    for (let i = 0; i < 3; i++) {
      const el = createElement("pswp__item", false, this.pswp.container);
      el.style.display = i === 1 ? "block" : "none";
      this.itemHolders.push({
        el
      });
    }
  }
  canBeSwiped() {
    return this.pswp.getNumItems() > 1;
  }
  moveIndexBy(diff, animate, velocityX) {
    const { pswp } = this;
    let newIndex = pswp.potentialIndex + diff;
    const numSlides = pswp.getNumItems();
    if (pswp.canLoop()) {
      newIndex = pswp.getLoopedIndex(newIndex);
      const distance = (diff + numSlides) % numSlides;
      if (distance <= numSlides / 2) {
        diff = distance;
      } else {
        diff = distance - numSlides;
      }
    } else {
      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex >= numSlides) {
        newIndex = numSlides - 1;
      }
      diff = newIndex - pswp.potentialIndex;
    }
    pswp.potentialIndex = newIndex;
    this._currPositionIndex -= diff;
    pswp.animations.stopMainScroll();
    const destinationX = this.getCurrSlideX();
    if (!animate) {
      this.moveTo(destinationX);
      this.updateCurrItem();
    } else {
      pswp.animations.startSpring({
        isMainScroll: true,
        start: this.x,
        end: destinationX,
        velocity: velocityX || 0,
        naturalFrequency: 30,
        dampingRatio: 1,
        onUpdate: (x) => {
          this.moveTo(x);
        },
        onComplete: () => {
          this.updateCurrItem();
          pswp.appendHeavy();
        }
      });
      let currDiff = pswp.potentialIndex - pswp.currIndex;
      if (pswp.canLoop()) {
        const currDistance = (currDiff + numSlides) % numSlides;
        if (currDistance <= numSlides / 2) {
          currDiff = currDistance;
        } else {
          currDiff = currDistance - numSlides;
        }
      }
      if (Math.abs(currDiff) > 1) {
        this.updateCurrItem();
      }
    }
    if (diff) {
      return true;
    }
  }
  getCurrSlideX() {
    return this.slideWidth * this._currPositionIndex;
  }
  isShifted() {
    return this.x !== this.getCurrSlideX();
  }
  updateCurrItem() {
    const { pswp } = this;
    const positionDifference = this._prevPositionIndex - this._currPositionIndex;
    if (!positionDifference) {
      return;
    }
    this._prevPositionIndex = this._currPositionIndex;
    pswp.currIndex = pswp.potentialIndex;
    let diffAbs = Math.abs(positionDifference);
    let tempHolder;
    if (diffAbs >= 3) {
      this._containerShiftIndex += positionDifference + (positionDifference > 0 ? -3 : 3);
      diffAbs = 3;
    }
    for (let i = 0; i < diffAbs; i++) {
      if (positionDifference > 0) {
        tempHolder = this.itemHolders.shift();
        this.itemHolders[2] = tempHolder;
        this._containerShiftIndex++;
        setTransform(tempHolder.el, (this._containerShiftIndex + 2) * this.slideWidth);
        pswp.setContent(tempHolder, pswp.currIndex - diffAbs + i + 2);
      } else {
        tempHolder = this.itemHolders.pop();
        this.itemHolders.unshift(tempHolder);
        this._containerShiftIndex--;
        setTransform(tempHolder.el, this._containerShiftIndex * this.slideWidth);
        pswp.setContent(tempHolder, pswp.currIndex + diffAbs - i - 2);
      }
    }
    if (Math.abs(this._containerShiftIndex) > 50 && !this.isShifted()) {
      this.resetPosition();
      this.resize();
    }
    pswp.animations.stopAllPan();
    this.itemHolders.forEach((itemHolder, i) => {
      if (itemHolder.slide) {
        itemHolder.slide.setIsActive(i === 1);
      }
    });
    pswp.currSlide = this.itemHolders[1].slide;
    pswp.contentLoader.updateLazy(positionDifference);
    pswp.currSlide.applyCurrentZoomPan();
    pswp.dispatch("change");
  }
  moveTo(x, dragging) {
    let newSlideIndexOffset;
    let delta;
    if (!this.pswp.canLoop() && dragging) {
      newSlideIndexOffset = (this.slideWidth * this._currPositionIndex - x) / this.slideWidth;
      newSlideIndexOffset += this.pswp.currIndex;
      delta = Math.round(x - this.x);
      if (newSlideIndexOffset < 0 && delta > 0 || newSlideIndexOffset >= this.pswp.getNumItems() - 1 && delta < 0) {
        x = this.x + delta * MAIN_SCROLL_END_FRICTION;
      }
    }
    this.x = x;
    setTransform(this.pswp.container, x);
    this.pswp.dispatch("moveMainScroll", { x, dragging });
  }
}
class Keyboard {
  constructor(pswp) {
    this.pswp = pswp;
    pswp.on("bindEvents", () => {
      if (!pswp.options.initialPointerPos) {
        this._focusRoot();
      }
      pswp.events.add(document, "focusin", this._onFocusIn.bind(this));
      pswp.events.add(document, "keydown", this._onKeyDown.bind(this));
    });
    const lastActiveElement = document.activeElement;
    pswp.on("destroy", () => {
      if (pswp.options.returnFocus && lastActiveElement && this._wasFocused) {
        lastActiveElement.focus();
      }
    });
  }
  _focusRoot() {
    if (!this._wasFocused) {
      this.pswp.element.focus();
      this._wasFocused = true;
    }
  }
  _onKeyDown(e) {
    const { pswp } = this;
    if (pswp.dispatch("keydown", { originalEvent: e }).defaultPrevented) {
      return;
    }
    if (specialKeyUsed(e)) {
      return;
    }
    let keydownAction;
    let axis;
    let isForward;
    switch (e.keyCode) {
      case 27:
        if (pswp.options.escKey) {
          keydownAction = "close";
        }
        break;
      case 90:
        keydownAction = "toggleZoom";
        break;
      case 37:
        axis = "x";
        break;
      case 38:
        axis = "y";
        break;
      case 39:
        axis = "x";
        isForward = true;
        break;
      case 40:
        isForward = true;
        axis = "y";
        break;
      case 9:
        this._focusRoot();
        break;
    }
    if (axis) {
      e.preventDefault();
      const { currSlide } = pswp;
      if (pswp.options.arrowKeys && axis === "x" && pswp.getNumItems() > 1) {
        keydownAction = isForward ? "next" : "prev";
      } else if (currSlide && currSlide.currZoomLevel > currSlide.zoomLevels.fit) {
        currSlide.pan[axis] += isForward ? -80 : 80;
        currSlide.panTo(currSlide.pan.x, currSlide.pan.y);
      }
    }
    if (keydownAction) {
      e.preventDefault();
      pswp[keydownAction]();
    }
  }
  _onFocusIn(e) {
    const { template } = this.pswp;
    if (document !== e.target && template !== e.target && !template.contains(e.target)) {
      template.focus();
    }
  }
}
const DEFAULT_EASING = "cubic-bezier(.4,0,.22,1)";
class CSSAnimation {
  constructor(props) {
    this.props = props;
    const {
      target,
      onComplete,
      transform,
      onFinish
    } = props;
    let {
      duration,
      easing
    } = props;
    this.onFinish = onFinish;
    const prop = transform ? "transform" : "opacity";
    const propValue = props[prop];
    this._target = target;
    this._onComplete = onComplete;
    duration = duration || 333;
    easing = easing || DEFAULT_EASING;
    this._onTransitionEnd = this._onTransitionEnd.bind(this);
    this._helperTimeout = setTimeout(() => {
      setTransitionStyle(target, prop, duration, easing);
      this._helperTimeout = setTimeout(() => {
        target.addEventListener("transitionend", this._onTransitionEnd, false);
        target.addEventListener("transitioncancel", this._onTransitionEnd, false);
        this._helperTimeout = setTimeout(() => {
          this._finalizeAnimation();
        }, duration + 500);
        target.style[prop] = propValue;
      }, 30);
    }, 0);
  }
  _onTransitionEnd(e) {
    if (e.target === this._target) {
      this._finalizeAnimation();
    }
  }
  _finalizeAnimation() {
    if (!this._finished) {
      this._finished = true;
      this.onFinish();
      if (this._onComplete) {
        this._onComplete();
      }
    }
  }
  destroy() {
    if (this._helperTimeout) {
      clearTimeout(this._helperTimeout);
    }
    removeTransitionStyle(this._target);
    this._target.removeEventListener("transitionend", this._onTransitionEnd, false);
    this._target.removeEventListener("transitioncancel", this._onTransitionEnd, false);
    if (!this._finished) {
      this._finalizeAnimation();
    }
  }
}
const DEFAULT_NATURAL_FREQUENCY = 12;
const DEFAULT_DAMPING_RATIO = 0.75;
class SpringEaser {
  constructor(initialVelocity, dampingRatio, naturalFrequency) {
    this.velocity = initialVelocity * 1e3;
    this._dampingRatio = dampingRatio || DEFAULT_DAMPING_RATIO;
    this._naturalFrequency = naturalFrequency || DEFAULT_NATURAL_FREQUENCY;
    if (this._dampingRatio < 1) {
      this._dampedFrequency = this._naturalFrequency * Math.sqrt(1 - this._dampingRatio * this._dampingRatio);
    }
  }
  easeFrame(deltaPosition, deltaTime) {
    let displacement = 0;
    let coeff;
    deltaTime /= 1e3;
    const naturalDumpingPow = Math.E ** (-this._dampingRatio * this._naturalFrequency * deltaTime);
    if (this._dampingRatio === 1) {
      coeff = this.velocity + this._naturalFrequency * deltaPosition;
      displacement = (deltaPosition + coeff * deltaTime) * naturalDumpingPow;
      this.velocity = displacement * -this._naturalFrequency + coeff * naturalDumpingPow;
    } else if (this._dampingRatio < 1) {
      coeff = 1 / this._dampedFrequency * (this._dampingRatio * this._naturalFrequency * deltaPosition + this.velocity);
      const dumpedFCos = Math.cos(this._dampedFrequency * deltaTime);
      const dumpedFSin = Math.sin(this._dampedFrequency * deltaTime);
      displacement = naturalDumpingPow * (deltaPosition * dumpedFCos + coeff * dumpedFSin);
      this.velocity = displacement * -this._naturalFrequency * this._dampingRatio + naturalDumpingPow * (-this._dampedFrequency * deltaPosition * dumpedFSin + this._dampedFrequency * coeff * dumpedFCos);
    }
    return displacement;
  }
}
class SpringAnimation {
  constructor(props) {
    this.props = props;
    const {
      start,
      end,
      velocity,
      onUpdate,
      onComplete,
      onFinish,
      dampingRatio,
      naturalFrequency
    } = props;
    this.onFinish = onFinish;
    const easer = new SpringEaser(velocity, dampingRatio, naturalFrequency);
    let prevTime = Date.now();
    let deltaPosition = start - end;
    const animationLoop = () => {
      if (this._raf) {
        deltaPosition = easer.easeFrame(deltaPosition, Date.now() - prevTime);
        if (Math.abs(deltaPosition) < 1 && Math.abs(easer.velocity) < 50) {
          onUpdate(end);
          if (onComplete) {
            onComplete();
          }
          this.onFinish();
        } else {
          prevTime = Date.now();
          onUpdate(deltaPosition + end);
          this._raf = requestAnimationFrame(animationLoop);
        }
      }
    };
    this._raf = requestAnimationFrame(animationLoop);
  }
  destroy() {
    if (this._raf >= 0) {
      cancelAnimationFrame(this._raf);
    }
    this._raf = null;
  }
}
class Animations {
  constructor() {
    this.activeAnimations = [];
  }
  startSpring(props) {
    this._start(props, true);
  }
  startTransition(props) {
    this._start(props);
  }
  _start(props, isSpring) {
    let animation;
    if (isSpring) {
      animation = new SpringAnimation(props);
    } else {
      animation = new CSSAnimation(props);
    }
    this.activeAnimations.push(animation);
    animation.onFinish = () => this.stop(animation);
    return animation;
  }
  stop(animation) {
    animation.destroy();
    const index = this.activeAnimations.indexOf(animation);
    if (index > -1) {
      this.activeAnimations.splice(index, 1);
    }
  }
  stopAll() {
    this.activeAnimations.forEach((animation) => {
      animation.destroy();
    });
    this.activeAnimations = [];
  }
  stopAllPan() {
    this.activeAnimations = this.activeAnimations.filter((animation) => {
      if (animation.props.isPan) {
        animation.destroy();
        return false;
      }
      return true;
    });
  }
  stopMainScroll() {
    this.activeAnimations = this.activeAnimations.filter((animation) => {
      if (animation.props.isMainScroll) {
        animation.destroy();
        return false;
      }
      return true;
    });
  }
  isPanRunning() {
    return this.activeAnimations.some((animation) => {
      return animation.props.isPan;
    });
  }
}
class ScrollWheel {
  constructor(pswp) {
    this.pswp = pswp;
    pswp.events.add(pswp.element, "wheel", this._onWheel.bind(this));
  }
  _onWheel(e) {
    e.preventDefault();
    const { currSlide } = this.pswp;
    let { deltaX, deltaY } = e;
    if (!currSlide) {
      return;
    }
    if (this.pswp.dispatch("wheel", { originalEvent: e }).defaultPrevented) {
      return;
    }
    if (e.ctrlKey || this.pswp.options.wheelToZoom) {
      if (currSlide.isZoomable()) {
        let zoomFactor = -deltaY;
        if (e.deltaMode === 1) {
          zoomFactor *= 0.05;
        } else {
          zoomFactor *= e.deltaMode ? 1 : 2e-3;
        }
        zoomFactor = 2 ** zoomFactor;
        const destZoomLevel = currSlide.currZoomLevel * zoomFactor;
        currSlide.zoomTo(destZoomLevel, {
          x: e.clientX,
          y: e.clientY
        });
      }
    } else {
      if (currSlide.isPannable()) {
        if (e.deltaMode === 1) {
          deltaX *= 18;
          deltaY *= 18;
        }
        currSlide.panTo(
          currSlide.pan.x - deltaX,
          currSlide.pan.y - deltaY
        );
      }
    }
  }
}
function addElementHTML(htmlData) {
  if (typeof htmlData === "string") {
    return htmlData;
  }
  if (!htmlData || !htmlData.isCustomSVG) {
    return "";
  }
  const svgData = htmlData;
  let out = '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 %d %d" width="%d" height="%d">';
  out = out.split("%d").join(svgData.size || 32);
  if (svgData.outlineID) {
    out += '<use class="pswp__icn-shadow" xlink:href="#' + svgData.outlineID + '"/>';
  }
  out += svgData.inner;
  out += "</svg>";
  return out;
}
class UIElement {
  constructor(pswp, data) {
    const name = data.name || data.className;
    let elementHTML = data.html;
    if (pswp.options[name] === false) {
      return;
    }
    if (typeof pswp.options[name + "SVG"] === "string") {
      elementHTML = pswp.options[name + "SVG"];
    }
    pswp.dispatch("uiElementCreate", { data });
    let className = "";
    if (data.isButton) {
      className += "pswp__button ";
      className += data.className || `pswp__button--${data.name}`;
    } else {
      className += data.className || `pswp__${data.name}`;
    }
    let element;
    let tagName = data.isButton ? data.tagName || "button" : data.tagName || "div";
    tagName = tagName.toLowerCase();
    element = createElement(className, tagName);
    if (data.isButton) {
      element = createElement(className, tagName);
      if (tagName === "button") {
        element.type = "button";
      }
      let { title } = data;
      const { ariaLabel } = data;
      if (typeof pswp.options[name + "Title"] === "string") {
        title = pswp.options[name + "Title"];
      }
      if (title) {
        element.title = title;
      }
      if (ariaLabel || title) {
        element.setAttribute("aria-label", ariaLabel || title);
      }
    }
    element.innerHTML = addElementHTML(elementHTML);
    if (data.onInit) {
      data.onInit(element, pswp);
    }
    if (data.onClick) {
      element.onclick = (e) => {
        if (typeof data.onClick === "string") {
          pswp[data.onClick]();
        } else {
          data.onClick(e, element, pswp);
        }
      };
    }
    const appendTo = data.appendTo || "bar";
    let container;
    if (appendTo === "bar") {
      if (!pswp.topBar) {
        pswp.topBar = createElement("pswp__top-bar pswp__hide-on-close", "div", pswp.scrollWrap);
      }
      container = pswp.topBar;
    } else {
      element.classList.add("pswp__hide-on-close");
      if (appendTo === "wrapper") {
        container = pswp.scrollWrap;
      } else {
        container = pswp.element;
      }
    }
    container.appendChild(pswp.applyFilters("uiElement", element, data));
  }
}
function initArrowButton(element, pswp, isNextButton) {
  element.classList.add("pswp__button--arrow");
  pswp.on("change", () => {
    if (!pswp.options.loop) {
      if (isNextButton) {
        element.disabled = !(pswp.currIndex < pswp.getNumItems() - 1);
      } else {
        element.disabled = !(pswp.currIndex > 0);
      }
    }
  });
}
const arrowPrev = {
  name: "arrowPrev",
  className: "pswp__button--arrow--prev",
  title: "Previous",
  order: 10,
  isButton: true,
  appendTo: "wrapper",
  html: {
    isCustomSVG: true,
    size: 60,
    inner: '<path d="M29 43l-3 3-16-16 16-16 3 3-13 13 13 13z" id="pswp__icn-arrow"/>',
    outlineID: "pswp__icn-arrow"
  },
  onClick: "prev",
  onInit: initArrowButton
};
const arrowNext = {
  name: "arrowNext",
  className: "pswp__button--arrow--next",
  title: "Next",
  order: 11,
  isButton: true,
  appendTo: "wrapper",
  html: {
    isCustomSVG: true,
    size: 60,
    inner: '<use xlink:href="#pswp__icn-arrow"/>',
    outlineID: "pswp__icn-arrow"
  },
  onClick: "next",
  onInit: (el, pswp) => {
    initArrowButton(el, pswp, true);
  }
};
const closeButton = {
  name: "close",
  title: "Close",
  order: 20,
  isButton: true,
  html: {
    isCustomSVG: true,
    inner: '<path d="M24 10l-2-2-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6z" id="pswp__icn-close"/>',
    outlineID: "pswp__icn-close"
  },
  onClick: "close"
};
const zoomButton = {
  name: "zoom",
  title: "Zoom",
  order: 10,
  isButton: true,
  html: {
    isCustomSVG: true,
    inner: '<path d="M17.426 19.926a6 6 0 1 1 1.5-1.5L23 22.5 21.5 24l-4.074-4.074z" id="pswp__icn-zoom"/><path fill="currentColor" class="pswp__zoom-icn-bar-h" d="M11 16v-2h6v2z"/><path fill="currentColor" class="pswp__zoom-icn-bar-v" d="M13 12h2v6h-2z"/>',
    outlineID: "pswp__icn-zoom"
  },
  onClick: "toggleZoom"
};
const loadingIndicator = {
  name: "preloader",
  appendTo: "bar",
  order: 7,
  html: {
    isCustomSVG: true,
    inner: '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2 16a5.2 5.2 0 1 1-5.2-5.2V8a8 8 0 1 0 8 8h-2.8Z" id="pswp__icn-loading"/>',
    outlineID: "pswp__icn-loading"
  },
  onInit: (indicatorElement, pswp) => {
    let isVisible;
    let delayTimeout;
    const toggleIndicatorClass = (className, add) => {
      indicatorElement.classList[add ? "add" : "remove"]("pswp__preloader--" + className);
    };
    const setIndicatorVisibility = (visible) => {
      if (isVisible !== visible) {
        isVisible = visible;
        toggleIndicatorClass("active", visible);
      }
    };
    const updatePreloaderVisibility = () => {
      if (!pswp.currSlide.content.isLoading()) {
        setIndicatorVisibility(false);
        if (delayTimeout) {
          clearTimeout(delayTimeout);
          delayTimeout = null;
        }
        return;
      }
      if (!delayTimeout) {
        delayTimeout = setTimeout(() => {
          setIndicatorVisibility(pswp.currSlide.content.isLoading());
          delayTimeout = null;
        }, pswp.options.preloaderDelay);
      }
    };
    pswp.on("change", updatePreloaderVisibility);
    pswp.on("loadComplete", (e) => {
      if (pswp.currSlide === e.slide) {
        updatePreloaderVisibility();
      }
    });
    pswp.ui.updatePreloaderVisibility = updatePreloaderVisibility;
  }
};
const counterIndicator = {
  name: "counter",
  order: 5,
  onInit: (counterElement, pswp) => {
    pswp.on("change", () => {
      counterElement.innerText = pswp.currIndex + 1 + pswp.options.indexIndicatorSep + pswp.getNumItems();
    });
  }
};
function setZoomedIn(el, isZoomedIn) {
  el.classList[isZoomedIn ? "add" : "remove"]("pswp--zoomed-in");
}
class UI {
  constructor(pswp) {
    this.pswp = pswp;
    this.updatePreloaderVisibility = void 0;
    this._lastUpdatedZoomLevel = void 0;
  }
  init() {
    const { pswp } = this;
    this.isRegistered = false;
    this.uiElementsData = [
      closeButton,
      arrowPrev,
      arrowNext,
      zoomButton,
      loadingIndicator,
      counterIndicator
    ];
    pswp.dispatch("uiRegister");
    this.uiElementsData.sort((a, b) => {
      return (a.order || 0) - (b.order || 0);
    });
    this.items = [];
    this.isRegistered = true;
    this.uiElementsData.forEach((uiElementData) => {
      this.registerElement(uiElementData);
    });
    pswp.on("change", () => {
      pswp.element.classList[pswp.getNumItems() === 1 ? "add" : "remove"]("pswp--one-slide");
    });
    pswp.on("zoomPanUpdate", () => this._onZoomPanUpdate());
  }
  registerElement(elementData) {
    if (this.isRegistered) {
      this.items.push(
        new UIElement(this.pswp, elementData)
      );
    } else {
      this.uiElementsData.push(elementData);
    }
  }
  _onZoomPanUpdate() {
    const { template, currSlide, options } = this.pswp;
    let { currZoomLevel } = currSlide;
    if (this.pswp.opener.isClosing) {
      return;
    }
    if (!this.pswp.opener.isOpen) {
      currZoomLevel = currSlide.zoomLevels.initial;
    }
    if (currZoomLevel === this._lastUpdatedZoomLevel) {
      return;
    }
    this._lastUpdatedZoomLevel = currZoomLevel;
    const currZoomLevelDiff = currSlide.zoomLevels.initial - currSlide.zoomLevels.secondary;
    if (Math.abs(currZoomLevelDiff) < 0.01 || !currSlide.isZoomable()) {
      setZoomedIn(template, false);
      template.classList.remove("pswp--zoom-allowed");
      return;
    }
    template.classList.add("pswp--zoom-allowed");
    const potentialZoomLevel = currZoomLevel === currSlide.zoomLevels.initial ? currSlide.zoomLevels.secondary : currSlide.zoomLevels.initial;
    setZoomedIn(template, potentialZoomLevel <= currZoomLevel);
    if (options.imageClickAction === "zoom" || options.imageClickAction === "zoom-or-close") {
      template.classList.add("pswp--click-to-zoom");
    }
  }
}
function getBoundsByElement(el) {
  const thumbAreaRect = el.getBoundingClientRect();
  return {
    x: thumbAreaRect.left,
    y: thumbAreaRect.top,
    w: thumbAreaRect.width
  };
}
function getCroppedBoundsByElement(el, imageWidth, imageHeight) {
  const thumbAreaRect = el.getBoundingClientRect();
  const hRatio = thumbAreaRect.width / imageWidth;
  const vRatio = thumbAreaRect.height / imageHeight;
  const fillZoomLevel = hRatio > vRatio ? hRatio : vRatio;
  const offsetX = (thumbAreaRect.width - imageWidth * fillZoomLevel) / 2;
  const offsetY = (thumbAreaRect.height - imageHeight * fillZoomLevel) / 2;
  const bounds = {
    x: thumbAreaRect.left + offsetX,
    y: thumbAreaRect.top + offsetY,
    w: imageWidth * fillZoomLevel
  };
  bounds.innerRect = {
    w: thumbAreaRect.width,
    h: thumbAreaRect.height,
    x: offsetX,
    y: offsetY
  };
  return bounds;
}
function getThumbBounds(index, itemData, instance) {
  const event = instance.dispatch("thumbBounds", {
    index,
    itemData,
    instance
  });
  if (event.thumbBounds) {
    return event.thumbBounds;
  }
  const { element } = itemData;
  let thumbBounds;
  let thumbnail;
  if (element && instance.options.thumbSelector !== false) {
    const thumbSelector = instance.options.thumbSelector || "img";
    thumbnail = element.matches(thumbSelector) ? element : element.querySelector(thumbSelector);
  }
  thumbnail = instance.applyFilters("thumbEl", thumbnail, itemData, index);
  if (thumbnail) {
    if (!itemData.thumbCropped) {
      thumbBounds = getBoundsByElement(thumbnail);
    } else {
      thumbBounds = getCroppedBoundsByElement(
        thumbnail,
        itemData.width || itemData.w,
        itemData.height || itemData.h
      );
    }
  }
  return instance.applyFilters("thumbBounds", thumbBounds, itemData, index);
}
class PhotoSwipeEvent {
  constructor(type, details) {
    this.type = type;
    if (details) {
      Object.assign(this, details);
    }
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
}
class Eventable {
  constructor() {
    this._listeners = {};
    this._filters = {};
    this.pswp = void 0;
    this.options = void 0;
  }
  addFilter(name, fn, priority = 100) {
    if (!this._filters[name]) {
      this._filters[name] = [];
    }
    this._filters[name].push({ fn, priority });
    this._filters[name].sort((f1, f2) => f1.priority - f2.priority);
    if (this.pswp) {
      this.pswp.addFilter(name, fn, priority);
    }
  }
  removeFilter(name, fn) {
    if (this._filters[name]) {
      this._filters[name] = this._filters[name].filter((filter) => filter.fn !== fn);
    }
    if (this.pswp) {
      this.pswp.removeFilter(name, fn);
    }
  }
  applyFilters(name, ...args) {
    if (this._filters[name]) {
      this._filters[name].forEach((filter) => {
        args[0] = filter.fn.apply(this, args);
      });
    }
    return args[0];
  }
  on(name, fn) {
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }
    this._listeners[name].push(fn);
    if (this.pswp) {
      this.pswp.on(name, fn);
    }
  }
  off(name, fn) {
    if (this._listeners[name]) {
      this._listeners[name] = this._listeners[name].filter((listener) => fn !== listener);
    }
    if (this.pswp) {
      this.pswp.off(name, fn);
    }
  }
  dispatch(name, details) {
    if (this.pswp) {
      return this.pswp.dispatch(name, details);
    }
    const event = new PhotoSwipeEvent(name, details);
    if (!this._listeners) {
      return event;
    }
    if (this._listeners[name]) {
      this._listeners[name].forEach((listener) => {
        listener.call(this, event);
      });
    }
    return event;
  }
}
class Placeholder {
  constructor(imageSrc, container) {
    this.element = createElement(
      "pswp__img pswp__img--placeholder",
      imageSrc ? "img" : "",
      container
    );
    if (imageSrc) {
      this.element.decoding = "async";
      this.element.alt = "";
      this.element.src = imageSrc;
      this.element.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hiden", "true");
  }
  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }
    if (this.element.tagName === "IMG") {
      setWidthHeight(this.element, 250, "auto");
      this.element.style.transformOrigin = "0 0";
      this.element.style.transform = toTransformString(0, 0, width / 250);
    } else {
      setWidthHeight(this.element, width, height);
    }
  }
  destroy() {
    if (this.element.parentNode) {
      this.element.remove();
    }
    this.element = null;
  }
}
class Content {
  constructor(itemData, instance, index) {
    this.instance = instance;
    this.data = itemData;
    this.index = index;
    this.element = void 0;
    this.displayedImageWidth = 0;
    this.displayedImageHeight = 0;
    this.width = Number(this.data.w) || Number(this.data.width) || 0;
    this.height = Number(this.data.h) || Number(this.data.height) || 0;
    this.isAttached = false;
    this.hasSlide = false;
    this.state = LOAD_STATE.IDLE;
    if (this.data.type) {
      this.type = this.data.type;
    } else if (this.data.src) {
      this.type = "image";
    } else {
      this.type = "html";
    }
    this.instance.dispatch("contentInit", { content: this });
  }
  removePlaceholder() {
    if (this.placeholder && !this.keepPlaceholder()) {
      setTimeout(() => {
        if (this.placeholder) {
          this.placeholder.destroy();
          this.placeholder = null;
        }
      }, 1e3);
    }
  }
  load(isLazy, reload) {
    if (!this.placeholder && this.slide && this.usePlaceholder()) {
      const placeholderSrc = this.instance.applyFilters(
        "placeholderSrc",
        this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false,
        this
      );
      this.placeholder = new Placeholder(
        placeholderSrc,
        this.slide.container
      );
    }
    if (this.element && !reload) {
      return;
    }
    if (this.instance.dispatch("contentLoad", { content: this, isLazy }).defaultPrevented) {
      return;
    }
    if (this.isImageContent()) {
      this.element = createElement("pswp__img", "img");
      if (this.displayedImageWidth) {
        this.loadImage(isLazy);
      }
    } else {
      this.element = createElement("pswp__content");
      this.element.innerHTML = this.data.html || "";
    }
    if (reload && this.slide) {
      this.slide.updateContentSize(true);
    }
  }
  loadImage(isLazy) {
    const imageElement = this.element;
    if (this.instance.dispatch("contentLoadImage", { content: this, isLazy }).defaultPrevented) {
      return;
    }
    this.updateSrcsetSizes();
    if (this.data.srcset) {
      imageElement.srcset = this.data.srcset;
    }
    imageElement.src = this.data.src;
    imageElement.alt = this.data.alt || "";
    this.state = LOAD_STATE.LOADING;
    if (imageElement.complete) {
      this.onLoaded();
    } else {
      imageElement.onload = () => {
        this.onLoaded();
      };
      imageElement.onerror = () => {
        this.onError();
      };
    }
  }
  setSlide(slide) {
    this.slide = slide;
    this.hasSlide = true;
    this.instance = slide.pswp;
  }
  onLoaded() {
    this.state = LOAD_STATE.LOADED;
    if (this.slide) {
      this.instance.dispatch("loadComplete", { slide: this.slide, content: this });
      if (this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode) {
        this.append();
        this.slide.updateContentSize(true);
      }
      if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
        this.removePlaceholder();
      }
    }
  }
  onError() {
    this.state = LOAD_STATE.ERROR;
    if (this.slide) {
      this.displayError();
      this.instance.dispatch("loadComplete", { slide: this.slide, isError: true, content: this });
      this.instance.dispatch("loadError", { slide: this.slide, content: this });
    }
  }
  isLoading() {
    return this.instance.applyFilters(
      "isContentLoading",
      this.state === LOAD_STATE.LOADING,
      this
    );
  }
  isError() {
    return this.state === LOAD_STATE.ERROR;
  }
  isImageContent() {
    return this.type === "image";
  }
  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }
    if (this.placeholder) {
      this.placeholder.setDisplayedSize(width, height);
    }
    if (this.instance.dispatch("contentResize", { content: this, width, height }).defaultPrevented) {
      return;
    }
    setWidthHeight(this.element, width, height);
    if (this.isImageContent() && !this.isError()) {
      const isInitialSizeUpdate = !this.displayedImageWidth && width;
      this.displayedImageWidth = width;
      this.displayedImageHeight = height;
      if (isInitialSizeUpdate) {
        this.loadImage(false);
      } else {
        this.updateSrcsetSizes();
      }
      if (this.slide) {
        this.instance.dispatch("imageSizeChange", { slide: this.slide, width, height, content: this });
      }
    }
  }
  isZoomable() {
    return this.instance.applyFilters(
      "isContentZoomable",
      this.isImageContent() && this.state !== LOAD_STATE.ERROR,
      this
    );
  }
  updateSrcsetSizes() {
    if (this.data.srcset) {
      const image = this.element;
      const sizesWidth = this.instance.applyFilters(
        "srcsetSizesWidth",
        this.displayedImageWidth,
        this
      );
      if (!image.dataset.largestUsedSize || sizesWidth > parseInt(image.dataset.largestUsedSize, 10)) {
        image.sizes = sizesWidth + "px";
        image.dataset.largestUsedSize = String(sizesWidth);
      }
    }
  }
  usePlaceholder() {
    return this.instance.applyFilters(
      "useContentPlaceholder",
      this.isImageContent(),
      this
    );
  }
  lazyLoad() {
    if (this.instance.dispatch("contentLazyLoad", { content: this }).defaultPrevented) {
      return;
    }
    this.load(true);
  }
  keepPlaceholder() {
    return this.instance.applyFilters(
      "isKeepingPlaceholder",
      this.isLoading(),
      this
    );
  }
  destroy() {
    this.hasSlide = false;
    this.slide = null;
    if (this.instance.dispatch("contentDestroy", { content: this }).defaultPrevented) {
      return;
    }
    this.remove();
    if (this.isImageContent() && this.element) {
      this.element.onload = null;
      this.element.onerror = null;
      this.element = null;
    }
  }
  displayError() {
    if (this.slide) {
      let errorMsgEl = createElement("pswp__error-msg");
      errorMsgEl.innerText = this.instance.options.errorMsg;
      errorMsgEl = this.instance.applyFilters(
        "contentErrorElement",
        errorMsgEl,
        this
      );
      this.element = createElement("pswp__content pswp__error-msg-container");
      this.element.appendChild(errorMsgEl);
      this.slide.container.innerText = "";
      this.slide.container.appendChild(this.element);
      this.slide.updateContentSize(true);
      this.removePlaceholder();
    }
  }
  append() {
    if (this.isAttached) {
      return;
    }
    this.isAttached = true;
    if (this.state === LOAD_STATE.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", { content: this }).defaultPrevented) {
      return;
    }
    const supportsDecode = "decode" in this.element;
    if (this.isImageContent()) {
      if (supportsDecode && this.slide && (!this.slide.isActive || isSafari())) {
        this.isDecoding = true;
        this.element.decode().finally(() => {
          this.isDecoding = false;
          this.appendImage();
        });
      } else {
        this.appendImage();
      }
    } else if (this.element && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
  }
  activate() {
    if (this.instance.dispatch("contentActivate", { content: this }).defaultPrevented) {
      return;
    }
    if (this.slide) {
      if (this.isImageContent() && this.isDecoding && !isSafari()) {
        this.appendImage();
      } else if (this.isError()) {
        this.load(false, true);
      }
    }
  }
  deactivate() {
    this.instance.dispatch("contentDeactivate", { content: this });
  }
  remove() {
    this.isAttached = false;
    if (this.instance.dispatch("contentRemove", { content: this }).defaultPrevented) {
      return;
    }
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
  }
  appendImage() {
    if (!this.isAttached) {
      return;
    }
    if (this.instance.dispatch("contentAppendImage", { content: this }).defaultPrevented) {
      return;
    }
    if (this.slide && this.element && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
    if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
      this.removePlaceholder();
    }
  }
}
const MIN_SLIDES_TO_CACHE = 5;
function lazyLoadData(itemData, instance, index) {
  const content = instance.createContentFromData(itemData, index);
  if (!content || !content.lazyLoad) {
    return;
  }
  const { options } = instance;
  const viewportSize = instance.viewportSize || getViewportSize(options, instance);
  const panAreaSize = getPanAreaSize(options, viewportSize, itemData, index);
  const zoomLevel = new ZoomLevel(options, itemData, -1);
  zoomLevel.update(content.width, content.height, panAreaSize);
  content.lazyLoad();
  content.setDisplayedSize(
    Math.ceil(content.width * zoomLevel.initial),
    Math.ceil(content.height * zoomLevel.initial)
  );
  return content;
}
function lazyLoadSlide(index, instance) {
  const itemData = instance.getItemData(index);
  if (instance.dispatch("lazyLoadSlide", { index, itemData }).defaultPrevented) {
    return;
  }
  return lazyLoadData(itemData, instance, index);
}
class ContentLoader {
  constructor(pswp) {
    this.pswp = pswp;
    this.limit = Math.max(
      pswp.options.preload[0] + pswp.options.preload[1] + 1,
      MIN_SLIDES_TO_CACHE
    );
    this._cachedItems = [];
  }
  updateLazy(diff) {
    const { pswp } = this;
    if (pswp.dispatch("lazyLoad").defaultPrevented) {
      return;
    }
    const { preload } = pswp.options;
    const isForward = diff === void 0 ? true : diff >= 0;
    let i;
    for (i = 0; i <= preload[1]; i++) {
      this.loadSlideByIndex(pswp.currIndex + (isForward ? i : -i));
    }
    for (i = 1; i <= preload[0]; i++) {
      this.loadSlideByIndex(pswp.currIndex + (isForward ? -i : i));
    }
  }
  loadSlideByIndex(index) {
    index = this.pswp.getLoopedIndex(index);
    let content = this.getContentByIndex(index);
    if (!content) {
      content = lazyLoadSlide(index, this.pswp);
      if (content) {
        this.addToCache(content);
      }
    }
  }
  getContentBySlide(slide) {
    let content = this.getContentByIndex(slide.index);
    if (!content) {
      content = this.pswp.createContentFromData(slide.data, slide.index);
      if (content) {
        this.addToCache(content);
      }
    }
    if (content) {
      content.setSlide(slide);
    }
    return content;
  }
  addToCache(content) {
    this.removeByIndex(content.index);
    this._cachedItems.push(content);
    if (this._cachedItems.length > this.limit) {
      const indexToRemove = this._cachedItems.findIndex((item) => {
        return !item.isAttached && !item.hasSlide;
      });
      if (indexToRemove !== -1) {
        const removedItem = this._cachedItems.splice(indexToRemove, 1)[0];
        removedItem.destroy();
      }
    }
  }
  removeByIndex(index) {
    const indexToRemove = this._cachedItems.findIndex((item) => item.index === index);
    if (indexToRemove !== -1) {
      this._cachedItems.splice(indexToRemove, 1);
    }
  }
  getContentByIndex(index) {
    return this._cachedItems.find((content) => content.index === index);
  }
  destroy() {
    this._cachedItems.forEach((content) => content.destroy());
    this._cachedItems = null;
  }
}
class PhotoSwipeBase extends Eventable {
  getNumItems() {
    let numItems;
    const { dataSource } = this.options;
    if (!dataSource) {
      numItems = 0;
    } else if ("length" in dataSource) {
      numItems = dataSource.length;
    } else if ("gallery" in dataSource) {
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }
      if (dataSource.items) {
        numItems = dataSource.items.length;
      }
    }
    const event = this.dispatch("numItems", {
      dataSource,
      numItems
    });
    return this.applyFilters("numItems", event.numItems, dataSource);
  }
  createContentFromData(slideData, index) {
    return new Content(slideData, this, index);
  }
  getItemData(index) {
    const { dataSource } = this.options;
    let dataSourceItem;
    if (Array.isArray(dataSource)) {
      dataSourceItem = dataSource[index];
    } else if (dataSource && dataSource.gallery) {
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }
      dataSourceItem = dataSource.items[index];
    }
    let itemData = dataSourceItem;
    if (itemData instanceof Element) {
      itemData = this._domElementToItemData(itemData);
    }
    const event = this.dispatch("itemData", {
      itemData: itemData || {},
      index
    });
    return this.applyFilters("itemData", event.itemData, index);
  }
  _getGalleryDOMElements(galleryElement) {
    if (this.options.children || this.options.childSelector) {
      return getElementsFromOption(
        this.options.children,
        this.options.childSelector,
        galleryElement
      ) || [];
    }
    return [galleryElement];
  }
  _domElementToItemData(element) {
    const itemData = {
      element
    };
    const linkEl = element.tagName === "A" ? element : element.querySelector("a");
    if (linkEl) {
      itemData.src = linkEl.dataset.pswpSrc || linkEl.href;
      if (linkEl.dataset.pswpSrcset) {
        itemData.srcset = linkEl.dataset.pswpSrcset;
      }
      itemData.width = parseInt(linkEl.dataset.pswpWidth, 10);
      itemData.height = parseInt(linkEl.dataset.pswpHeight, 10);
      itemData.w = itemData.width;
      itemData.h = itemData.height;
      if (linkEl.dataset.pswpType) {
        itemData.type = linkEl.dataset.pswpType;
      }
      const thumbnailEl = element.querySelector("img");
      if (thumbnailEl) {
        itemData.msrc = thumbnailEl.currentSrc || thumbnailEl.src;
        itemData.alt = thumbnailEl.getAttribute("alt");
      }
      if (linkEl.dataset.pswpCropped || linkEl.dataset.cropped) {
        itemData.thumbCropped = true;
      }
    }
    return this.applyFilters("domItemData", itemData, element, linkEl);
  }
  lazyLoadData(itemData, index) {
    return lazyLoadData(itemData, this, index);
  }
}
const MIN_OPACITY = 3e-3;
class Opener {
  constructor(pswp) {
    this.pswp = pswp;
    this.isClosed = true;
    this._prepareOpen = this._prepareOpen.bind(this);
    this._thumbBounds = void 0;
    pswp.on("firstZoomPan", this._prepareOpen);
  }
  open() {
    this._prepareOpen();
    this._start();
  }
  close() {
    if (this.isClosed || this.isClosing || this.isOpening) {
      return false;
    }
    const slide = this.pswp.currSlide;
    this.isOpen = false;
    this.isOpening = false;
    this.isClosing = true;
    this._duration = this.pswp.options.hideAnimationDuration;
    if (slide && slide.currZoomLevel * slide.width >= this.pswp.options.maxWidthToAnimate) {
      this._duration = 0;
    }
    this._applyStartProps();
    setTimeout(() => {
      this._start();
    }, this._croppedZoom ? 30 : 0);
    return true;
  }
  _prepareOpen() {
    this.pswp.off("firstZoomPan", this._prepareOpen);
    if (!this.isOpening) {
      const slide = this.pswp.currSlide;
      this.isOpening = true;
      this.isClosing = false;
      this._duration = this.pswp.options.showAnimationDuration;
      if (slide && slide.zoomLevels.initial * slide.width >= this.pswp.options.maxWidthToAnimate) {
        this._duration = 0;
      }
      this._applyStartProps();
    }
  }
  _applyStartProps() {
    const { pswp } = this;
    const slide = this.pswp.currSlide;
    const { options } = pswp;
    if (options.showHideAnimationType === "fade") {
      options.showHideOpacity = true;
      this._thumbBounds = false;
    } else if (options.showHideAnimationType === "none") {
      options.showHideOpacity = false;
      this._duration = 0;
      this._thumbBounds = false;
    } else if (this.isOpening && pswp._initialThumbBounds) {
      this._thumbBounds = pswp._initialThumbBounds;
    } else {
      this._thumbBounds = this.pswp.getThumbBounds();
    }
    this._placeholder = slide.getPlaceholderElement();
    pswp.animations.stopAll();
    this._useAnimation = this._duration > 50;
    this._animateZoom = Boolean(this._thumbBounds) && (slide.content && slide.content.usePlaceholder()) && (!this.isClosing || !pswp.mainScroll.isShifted());
    if (!this._animateZoom) {
      this._animateRootOpacity = true;
      if (this.isOpening) {
        slide.zoomAndPanToInitial();
        slide.applyCurrentZoomPan();
      }
    } else {
      this._animateRootOpacity = options.showHideOpacity;
    }
    this._animateBgOpacity = !this._animateRootOpacity && this.pswp.options.bgOpacity > MIN_OPACITY;
    this._opacityElement = this._animateRootOpacity ? pswp.element : pswp.bg;
    if (!this._useAnimation) {
      this._duration = 0;
      this._animateZoom = false;
      this._animateBgOpacity = false;
      this._animateRootOpacity = true;
      if (this.isOpening) {
        pswp.element.style.opacity = String(MIN_OPACITY);
        pswp.applyBgOpacity(1);
      }
      return;
    }
    if (this._animateZoom && this._thumbBounds && this._thumbBounds.innerRect) {
      this._croppedZoom = true;
      this._cropContainer1 = this.pswp.container;
      this._cropContainer2 = this.pswp.currSlide.holderElement;
      pswp.container.style.overflow = "hidden";
      pswp.container.style.width = pswp.viewportSize.x + "px";
    } else {
      this._croppedZoom = false;
    }
    if (this.isOpening) {
      if (this._animateRootOpacity) {
        pswp.element.style.opacity = String(MIN_OPACITY);
        pswp.applyBgOpacity(1);
      } else {
        if (this._animateBgOpacity) {
          pswp.bg.style.opacity = String(MIN_OPACITY);
        }
        pswp.element.style.opacity = "1";
      }
      if (this._animateZoom) {
        this._setClosedStateZoomPan();
        if (this._placeholder) {
          this._placeholder.style.willChange = "transform";
          this._placeholder.style.opacity = String(MIN_OPACITY);
        }
      }
    } else if (this.isClosing) {
      pswp.mainScroll.itemHolders[0].el.style.display = "none";
      pswp.mainScroll.itemHolders[2].el.style.display = "none";
      if (this._croppedZoom) {
        if (pswp.mainScroll.x !== 0) {
          pswp.mainScroll.resetPosition();
          pswp.mainScroll.resize();
        }
      }
    }
  }
  _start() {
    if (this.isOpening && this._useAnimation && this._placeholder && this._placeholder.tagName === "IMG") {
      new Promise((resolve) => {
        let decoded = false;
        let isDelaying = true;
        decodeImage(this._placeholder).finally(() => {
          decoded = true;
          if (!isDelaying) {
            resolve();
          }
        });
        setTimeout(() => {
          isDelaying = false;
          if (decoded) {
            resolve();
          }
        }, 50);
        setTimeout(resolve, 250);
      }).finally(() => this._initiate());
    } else {
      this._initiate();
    }
  }
  _initiate() {
    this.pswp.element.style.setProperty("--pswp-transition-duration", this._duration + "ms");
    this.pswp.dispatch(
      this.isOpening ? "openingAnimationStart" : "closingAnimationStart"
    );
    this.pswp.dispatch(
      "initialZoom" + (this.isOpening ? "In" : "Out")
    );
    this.pswp.element.classList[this.isOpening ? "add" : "remove"]("pswp--ui-visible");
    if (this.isOpening) {
      if (this._placeholder) {
        this._placeholder.style.opacity = "1";
      }
      this._animateToOpenState();
    } else if (this.isClosing) {
      this._animateToClosedState();
    }
    if (!this._useAnimation) {
      this._onAnimationComplete();
    }
  }
  _onAnimationComplete() {
    const { pswp } = this;
    this.isOpen = this.isOpening;
    this.isClosed = this.isClosing;
    this.isOpening = false;
    this.isClosing = false;
    pswp.dispatch(
      this.isOpen ? "openingAnimationEnd" : "closingAnimationEnd"
    );
    pswp.dispatch(
      "initialZoom" + (this.isOpen ? "InEnd" : "OutEnd")
    );
    if (this.isClosed) {
      pswp.destroy();
    } else if (this.isOpen) {
      if (this._animateZoom) {
        pswp.container.style.overflow = "visible";
        pswp.container.style.width = "100%";
      }
      pswp.currSlide.applyCurrentZoomPan();
    }
  }
  _animateToOpenState() {
    const { pswp } = this;
    if (this._animateZoom) {
      if (this._croppedZoom) {
        this._animateTo(this._cropContainer1, "transform", "translate3d(0,0,0)");
        this._animateTo(this._cropContainer2, "transform", "none");
      }
      pswp.currSlide.zoomAndPanToInitial();
      this._animateTo(
        pswp.currSlide.container,
        "transform",
        pswp.currSlide.getCurrentTransform()
      );
    }
    if (this._animateBgOpacity) {
      this._animateTo(pswp.bg, "opacity", String(pswp.options.bgOpacity));
    }
    if (this._animateRootOpacity) {
      this._animateTo(pswp.element, "opacity", "1");
    }
  }
  _animateToClosedState() {
    const { pswp } = this;
    if (this._animateZoom) {
      this._setClosedStateZoomPan(true);
    }
    if (this._animateBgOpacity && pswp.bgOpacity > 0.01) {
      this._animateTo(pswp.bg, "opacity", "0");
    }
    if (this._animateRootOpacity) {
      this._animateTo(pswp.element, "opacity", "0");
    }
  }
  _setClosedStateZoomPan(animate) {
    if (!this._thumbBounds)
      return;
    const { pswp } = this;
    const { innerRect } = this._thumbBounds;
    const { currSlide, viewportSize } = pswp;
    if (this._croppedZoom) {
      const containerOnePanX = -viewportSize.x + (this._thumbBounds.x - innerRect.x) + innerRect.w;
      const containerOnePanY = -viewportSize.y + (this._thumbBounds.y - innerRect.y) + innerRect.h;
      const containerTwoPanX = viewportSize.x - innerRect.w;
      const containerTwoPanY = viewportSize.y - innerRect.h;
      if (animate) {
        this._animateTo(
          this._cropContainer1,
          "transform",
          toTransformString(containerOnePanX, containerOnePanY)
        );
        this._animateTo(
          this._cropContainer2,
          "transform",
          toTransformString(containerTwoPanX, containerTwoPanY)
        );
      } else {
        setTransform(this._cropContainer1, containerOnePanX, containerOnePanY);
        setTransform(this._cropContainer2, containerTwoPanX, containerTwoPanY);
      }
    }
    equalizePoints(currSlide.pan, innerRect || this._thumbBounds);
    currSlide.currZoomLevel = this._thumbBounds.w / currSlide.width;
    if (animate) {
      this._animateTo(currSlide.container, "transform", currSlide.getCurrentTransform());
    } else {
      currSlide.applyCurrentZoomPan();
    }
  }
  _animateTo(target, prop, propValue) {
    if (!this._duration) {
      target.style[prop] = propValue;
      return;
    }
    const { animations } = this.pswp;
    const animProps = {
      duration: this._duration,
      easing: this.pswp.options.easing,
      onComplete: () => {
        if (!animations.activeAnimations.length) {
          this._onAnimationComplete();
        }
      },
      target
    };
    animProps[prop] = propValue;
    animations.startTransition(animProps);
  }
}
const defaultOptions = {
  allowPanToNext: true,
  spacing: 0.1,
  loop: true,
  pinchToClose: true,
  closeOnVerticalDrag: true,
  hideAnimationDuration: 333,
  showAnimationDuration: 333,
  zoomAnimationDuration: 333,
  escKey: true,
  arrowKeys: true,
  returnFocus: true,
  maxWidthToAnimate: 4e3,
  clickToCloseNonZoomable: true,
  imageClickAction: "zoom-or-close",
  bgClickAction: "close",
  tapAction: "toggle-controls",
  doubleTapAction: "zoom",
  indexIndicatorSep: " / ",
  preloaderDelay: 2e3,
  bgOpacity: 0.8,
  index: 0,
  errorMsg: "The image cannot be loaded",
  preload: [1, 2],
  easing: "cubic-bezier(.4,0,.22,1)"
};
class PhotoSwipe extends PhotoSwipeBase {
  constructor(options) {
    super();
    this._prepareOptions(options);
    this.offset = {};
    this._prevViewportSize = {};
    this.viewportSize = {};
    this.bgOpacity = 1;
    this.topBar = void 0;
    this.events = new DOMEvents();
    this.animations = new Animations();
    this.mainScroll = new MainScroll(this);
    this.gestures = new Gestures(this);
    this.opener = new Opener(this);
    this.keyboard = new Keyboard(this);
    this.contentLoader = new ContentLoader(this);
  }
  init() {
    if (this.isOpen || this.isDestroying) {
      return;
    }
    this.isOpen = true;
    this.dispatch("init");
    this.dispatch("beforeOpen");
    this._createMainStructure();
    let rootClasses = "pswp--open";
    if (this.gestures.supportsTouch) {
      rootClasses += " pswp--touch";
    }
    if (this.options.mainClass) {
      rootClasses += " " + this.options.mainClass;
    }
    this.element.className += " " + rootClasses;
    this.currIndex = this.options.index || 0;
    this.potentialIndex = this.currIndex;
    this.dispatch("firstUpdate");
    this.scrollWheel = new ScrollWheel(this);
    if (Number.isNaN(this.currIndex) || this.currIndex < 0 || this.currIndex >= this.getNumItems()) {
      this.currIndex = 0;
    }
    if (!this.gestures.supportsTouch) {
      this.mouseDetected();
    }
    this.updateSize();
    this.offset.y = window.pageYOffset;
    this._initialItemData = this.getItemData(this.currIndex);
    this.dispatch("gettingData", {
      index: this.currIndex,
      data: this._initialItemData,
      slide: void 0
    });
    this._initialThumbBounds = this.getThumbBounds();
    this.dispatch("initialLayout");
    this.on("openingAnimationEnd", () => {
      this.mainScroll.itemHolders[0].el.style.display = "block";
      this.mainScroll.itemHolders[2].el.style.display = "block";
      this.setContent(this.mainScroll.itemHolders[0], this.currIndex - 1);
      this.setContent(this.mainScroll.itemHolders[2], this.currIndex + 1);
      this.appendHeavy();
      this.contentLoader.updateLazy();
      this.events.add(window, "resize", this._handlePageResize.bind(this));
      this.events.add(window, "scroll", this._updatePageScrollOffset.bind(this));
      this.dispatch("bindEvents");
    });
    this.setContent(this.mainScroll.itemHolders[1], this.currIndex);
    this.dispatch("change");
    this.opener.open();
    this.dispatch("afterInit");
    return true;
  }
  getLoopedIndex(index) {
    const numSlides = this.getNumItems();
    if (this.options.loop) {
      if (index > numSlides - 1) {
        index -= numSlides;
      }
      if (index < 0) {
        index += numSlides;
      }
    }
    index = clamp(index, 0, numSlides - 1);
    return index;
  }
  appendHeavy() {
    this.mainScroll.itemHolders.forEach((itemHolder) => {
      if (itemHolder.slide) {
        itemHolder.slide.appendHeavy();
      }
    });
  }
  goTo(index) {
    this.mainScroll.moveIndexBy(
      this.getLoopedIndex(index) - this.potentialIndex
    );
  }
  next() {
    this.goTo(this.potentialIndex + 1);
  }
  prev() {
    this.goTo(this.potentialIndex - 1);
  }
  zoomTo(...args) {
    this.currSlide.zoomTo(...args);
  }
  toggleZoom() {
    this.currSlide.toggleZoom();
  }
  close() {
    if (!this.opener.isOpen || this.isDestroying) {
      return;
    }
    this.isDestroying = true;
    this.dispatch("close");
    this.events.removeAll();
    this.opener.close();
  }
  destroy() {
    if (!this.isDestroying) {
      this.options.showHideAnimationType = "none";
      this.close();
      return;
    }
    this.dispatch("destroy");
    this.listeners = null;
    this.scrollWrap.ontouchmove = null;
    this.scrollWrap.ontouchend = null;
    this.element.remove();
    this.mainScroll.itemHolders.forEach((itemHolder) => {
      if (itemHolder.slide) {
        itemHolder.slide.destroy();
      }
    });
    this.contentLoader.destroy();
    this.events.removeAll();
  }
  refreshSlideContent(slideIndex) {
    this.contentLoader.removeByIndex(slideIndex);
    this.mainScroll.itemHolders.forEach((itemHolder, i) => {
      let potentialHolderIndex = this.currSlide.index - 1 + i;
      if (this.canLoop()) {
        potentialHolderIndex = this.getLoopedIndex(potentialHolderIndex);
      }
      if (potentialHolderIndex === slideIndex) {
        this.setContent(itemHolder, slideIndex, true);
        if (i === 1) {
          this.currSlide = itemHolder.slide;
          itemHolder.slide.setIsActive(true);
        }
      }
    });
    this.dispatch("change");
  }
  setContent(holder, index, force) {
    if (this.canLoop()) {
      index = this.getLoopedIndex(index);
    }
    if (holder.slide) {
      if (holder.slide.index === index && !force) {
        return;
      }
      holder.slide.destroy();
      holder.slide = null;
    }
    if (!this.canLoop() && (index < 0 || index >= this.getNumItems())) {
      return;
    }
    const itemData = this.getItemData(index);
    holder.slide = new Slide(itemData, index, this);
    if (index === this.currIndex) {
      this.currSlide = holder.slide;
    }
    holder.slide.append(holder.el);
  }
  getViewportCenterPoint() {
    return {
      x: this.viewportSize.x / 2,
      y: this.viewportSize.y / 2
    };
  }
  updateSize(force) {
    if (this.isDestroying) {
      return;
    }
    const newViewportSize = getViewportSize(this.options, this);
    if (!force && pointsEqual(newViewportSize, this._prevViewportSize)) {
      return;
    }
    equalizePoints(this._prevViewportSize, newViewportSize);
    this.dispatch("beforeResize");
    equalizePoints(this.viewportSize, this._prevViewportSize);
    this._updatePageScrollOffset();
    this.dispatch("viewportSize");
    this.mainScroll.resize(this.opener.isOpen);
    if (!this.hasMouse && window.matchMedia("(any-hover: hover)").matches) {
      this.mouseDetected();
    }
    this.dispatch("resize");
  }
  applyBgOpacity(opacity) {
    this.bgOpacity = Math.max(opacity, 0);
    this.bg.style.opacity = String(this.bgOpacity * this.options.bgOpacity);
  }
  mouseDetected() {
    if (!this.hasMouse) {
      this.hasMouse = true;
      this.element.classList.add("pswp--has_mouse");
    }
  }
  _handlePageResize() {
    this.updateSize();
    if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
      setTimeout(() => {
        this.updateSize();
      }, 500);
    }
  }
  _updatePageScrollOffset() {
    this.setScrollOffset(0, window.pageYOffset);
  }
  setScrollOffset(x, y) {
    this.offset.x = x;
    this.offset.y = y;
    this.dispatch("updateScrollOffset");
  }
  _createMainStructure() {
    this.element = createElement("pswp");
    this.element.setAttribute("tabindex", "-1");
    this.element.setAttribute("role", "dialog");
    this.template = this.element;
    this.bg = createElement("pswp__bg", false, this.element);
    this.scrollWrap = createElement("pswp__scroll-wrap", false, this.element);
    this.container = createElement("pswp__container", false, this.scrollWrap);
    this.mainScroll.appendHolders();
    this.ui = new UI(this);
    this.ui.init();
    (this.options.appendToEl || document.body).appendChild(this.element);
  }
  getThumbBounds() {
    return getThumbBounds(
      this.currIndex,
      this.currSlide ? this.currSlide.data : this._initialItemData,
      this
    );
  }
  canLoop() {
    return this.options.loop && this.getNumItems() > 2;
  }
  _prepareOptions(options) {
    if (window.matchMedia("(prefers-reduced-motion), (update: slow)").matches) {
      options.showHideAnimationType = "none";
      options.zoomAnimationDuration = 0;
    }
    this.options = {
      ...defaultOptions,
      ...options
    };
  }
}
export { PhotoSwipe as default };
