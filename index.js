export default function Chameleons(Vue, VueElement) {
  let siteHead =
      document.head || document.getElementsByTagName("head").firstChild,
    stylesElement = document.createElement("style");

  siteHead.appendChild(stylesElement),
    document
      .querySelectorAll("[chameleons-tag]")
      .forEach((chameleonElement) => {
        let chameleonClassesInyect,
          chameleonNamed = document.querySelectorAll("[chameleons-name]"),
          chameleonClasses = chameleonElement.getAttribute("chameleons-apply"),
          chameleonsIgnoreClasses =
            chameleonElement.getAttribute("chameleons-ignore"),
          chameleonsData = chameleonElement.getAttribute("chameleons-data");

        if (chameleonsData !== null) {
          let chameleonParseData = JSON.parse(`${chameleonsData}`);
          chameleonClassesInyect = chameleonParseData;
        } else {
          chameleonClassesInyect = chameleonClasses;
        }

        let typeOfChameleonsClassesInyect = typeof chameleonClassesInyect,
          originalClasses = chameleonElement.getAttribute("class"),
          VueCloneElement = new (Vue.extend(VueElement))({}),
          chameleonsControlHidden =
            getComputedStyle(chameleonElement).display !== "none";

        if (
          (VueCloneElement.$mount(),
          chameleonElement.querySelectorAll("[chameleons]").length == 0 &&
            chameleonsControlHidden)
        ) {
          chameleonElement.className = "";

          let artificialContainer = document.createElement("div");

          chameleonElement.prepend(VueCloneElement.$el);

          let fixedParentElement =
              chameleonElement.querySelector("[chameleons]"),
            chameleonElementChild = chameleonElement.childNodes;

          chameleonNamed.length > 0 && typeOfChameleonsClassesInyect == "object"
            ? Object.keys(chameleonClassesInyect).forEach((Key) => {
                chameleonNamed.forEach((namedElement) => {
                  let nameOfElement =
                    namedElement.getAttribute("chameleons-name");
                  Key == nameOfElement &&
                    fixedParentElement.getAttribute("chameleons-name") ==
                      nameOfElement &&
                    (fixedParentElement.firstChild.nodeType == Node.TEXT_NODE
                      ? (fixedParentElement.childNodes[1].className += ` ${chameleonClassesInyect[Key]}`)
                      : (fixedParentElement.firstChild.className += ` ${chameleonClassesInyect[Key]}`));
                });
              })
            : fixedParentElement.firstChild.nodeType == Node.TEXT_NODE
            ? (fixedParentElement.childNodes[1].className += ` ${chameleonClassesInyect}`)
            : (fixedParentElement.firstChild.className += ` ${chameleonClassesInyect}`),
            fixedParentElement.appendChild(artificialContainer),
            (artificialContainer.className +=
              null == originalClasses
                ? "chameleons-hidden"
                : `${originalClasses} chameleons-hidden`),
            chameleonElementChild.forEach((n, l) => {
              if (
                l > 0 &&
                chameleonElementChild[l].nodeType != Node.TEXT_NODE
              ) {
                let l = chameleonElement.removeChild(n);
                artificialContainer.appendChild(l);
              }
            });

          if (chameleonsIgnoreClasses !== null) {
            chameleonElement.classList = chameleonsIgnoreClasses;
          }
        }
      });

  const stylesPureCSS = `
        *,
        *::before,
        *::after {
            box-sizing: border-box;
            
        }

        *[chameleons-tag] {
            width: 100%;
            position: relative;
            padding: 0;
            
        }

        *[chameleons-tag]:first-child {
            max-heigth: 0;
            overflow: hidden;
            
        }

        *[chameleons] {
            min-height: 100%;
            width: 100%;
            position: relative;
            box-sizing: border-box;
            top: 0;
            bottom: 0;
            z-index: 0;
            clip: rect(1px, auto, auto, 1px);
            /* IE8+ & other browsers */
            
        }

        *[chameleons]>* {
            width: 100%;
            z-index: 0;
            position: relative;
            
        }

        *[chameleons]>*:first-child {
            width: 100%;
            z-index: 10000;
            position: fixed;
            
        }

        *[chameleons-tag]> :not(*[chameleons], #menubg, #menu, .non-index) {
            position: relative;
            z-index: 0;
            
        }

        .chameleons-hidden {
            overflow: hidden;
            
        }

        *.chameleons-visible {
            overflow: visible !important;
            
        }

        @media screen and (-webkit-min-device-pixel-ratio:0) {
            *[chameleons] {
                clip: auto;
                -webkit-mask-image: -webkit-linear-gradient(top, #ffffff 0%, #ffffff 100%)
            }
            
        }
    `;

  stylesElement.styleSheet
    ? (stylesElement.styleSheet.ChamaleonsStylesText = stylesPureCSS)
    : stylesElement.appendChild(document.createTextNode(stylesPureCSS));
}
