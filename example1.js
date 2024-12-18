(function() {
    'use strict';

    // Function to replace text inside text nodes
    function replaceTextContent(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(/juniorsamababy@gmail\.com/g, 'dgm.pblima@communications.sbi.co.in');
        }
    }

    // Function to replace text inside attributes
    function replaceAttributes(node) {
        for (let attr of node.attributes) {
            if (attr.value.includes('juniorsamababy@gmail.com')) {
                attr.value = attr.value.replace(/juniorsamababy@gmail\.com/g, 'dgm.pblima@communications.sbi.co.in');
            }
        }
    }

    // Function to walk through the DOM and replace text in all text nodes and attributes
    function replaceTextInPage() {
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_ALL, null, false);
        let node;
        while (node = walk.nextNode()) {
            replaceTextContent(node);
            if (node.attributes) {
                replaceAttributes(node);
            }
        }
    }

    // Function to observe changes in the DOM and replace text dynamically
    function observeMutations() {
        alert("hi");
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            replaceTextInPage();
                        }
                    });
                } else if (mutation.type === 'attributes') {
                    replaceAttributes(mutation.target);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
        });
    }

    // Execute the text replacement once the document is fully loaded
    window.addEventListener('load', function() {
        console.log("Page fully loaded. Replacing text...");
        replaceTextInPage();
        observeMutations();
    });
})();