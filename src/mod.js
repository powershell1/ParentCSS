var cssobfuscator = false;

function IsThisFileLocation() {
    if (location.href.indexOf("file://") === 0) {
        return true;
    };
    return false;
};

function IsHaveCssValue(css, value) {
    if (css.indexOf(value) !== -1) {
        return true;
    };
    return false;
};

document.querySelectorAll("css-setting").forEach((tag, index) => {
    if (tag.getAttribute("obfuscator") === "true") {
        cssobfuscator = true;
    };
});
if (IsThisFileLocation()) {
    alert("This <css-import> don't support file:// protocol please change it to http:// or https://");
} else {
    var newstyle = document.createElement("style");
    newstyle.id = "cssmodstyle";
    document.head.appendChild(newstyle);
    document.querySelectorAll("css-import").forEach((tag, index) => {
        fetch(tag.getAttribute("href"), {
            method: "GET",
            headers: {
                "CSSRequester": "cssmod"
            }
        })
        .then((res) => {
            return res.text();
        })
        .then((body) => {
            document.querySelectorAll("css-import").forEach((tag, index) => {
                var parser = new CSSParser();
                var sheet = parser.parse(body, false, true);
                var stylebody = "";
                sheet["cssRules"].forEach((cssitem, cssindex) => {
                    tag.parentElement.classList.forEach((classitem, classindex) => {
                        if (!(IsHaveCssValue(cssitem.mSelectorText, classitem))) {
                            console.log(cssitem);
                            stylebody += cssitem.mSelectorText + " { " + cssitem.mStyle.mProperties.map((item, index) => {
                                return item.mName + ": " + item.mValue + ";";
                            }).join(" ") + " }\n";
                        } else {
                        };
                    });
                });
            });
            /*
            var parser = new CSSParser();
            var sheet = parser.parse(body, false, true);
            console.log(sheet.cssText());
            var cssbody = "";
            body.split("{").forEach((css, index) => {
                if (!(css.indexOf(";") > -1)) {
                    console.log(css);
                    css = css.substring(1, css.length).trim();
                    var tagvalueadded = "";
                    tag.parentElement.classList.forEach((eletag, indextag) => {
                        tagvalueadded += `.${eletag} `;
                        css.split(" ").forEach((cssitem, cssindex) => {
                            if (cssitem !== eletag) {
                                tagvalueadded += `${cssitem}`;
                            };
                        });
                    });
                    cssbody += `${tagvalueadded}{`;
                } else {
                    css = css.split("};")[0];
                    console.log(css);
                    cssbody += `}${css}`;
                };
            });
            newstyle.innerHTML += cssbody;
            */
        });
    });
};