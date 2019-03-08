'use strict';

export function addClassName(elem, newClass) {
    if (!elem) return false;

    let className = elem.className;
    let classes = className.split(" ");

    let alreadyExist = false;

    classes.forEach((name) => {
        if (name === newClass) {
            alreadyExist = true;
        }
    });

    if (alreadyExist) return true;

    classes.push(newClass);
    elem.className = classes.join(" ").trim();
}

export function removeClassName(elem, oldClass) {
    if (!elem) return false;

    let className = elem.className;
    let classes = className.split(" ");

    elem.className = classes.filter(function (name) {
        return (name !== oldClass);
    }).join(" ").trim();
}

export function getPageWidth() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(body.scrollWidth, body.offsetWidth,
        html.clientWidth, html.scrollWidth, html.offsetWidth);
}

export function getPageHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
}

export function getElementCoords(elem) {
    try {
        const box = elem.getBoundingClientRect();

        const body = document.body;
        const docEl = document.documentElement;

        const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        const clientTop = docEl.clientTop || body.clientTop || 0;
        const clientLeft = docEl.clientLeft || body.clientLeft || 0;

        const top = box.top + scrollTop - clientTop;
        const left = box.left + scrollLeft - clientLeft;

        return {y: Math.round(top), x: Math.round(left)};
    } catch (e) {
        return {y: 0, x: 0};
    }
}

export function getElementStyleAttribute(oElm, strCssRule) {
    let strValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if (oElm.currentStyle) {
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase();
        });

        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}

export function getImageSize(imageUrl, cb) {
    let container = document.createElement('div');
    container.id = "imagePreloadTest";

    container.style = 'opacity: 0;\n' +
        '  position: fixed;\n' +
        '  bottom: 0;\n' +
        '  right: 0;';

    let image = document.createElement('img');
    image.src = imageUrl;

    container.appendChild(image);
    document.body.appendChild(container);

    image.onload = () => {
        let width = image.clientWidth;
        let height = image.clientHeight;


        cb && cb({
            width: width,
            height: height
        });

        container.remove();
    };
};