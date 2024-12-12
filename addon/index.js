function replaceTextContent(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const originalText = node.textContent;
        const updatedText = originalText.replace(/(\d{1,3}(?:[.,]\d{3})*[.,]?\d*)\s?(EUR|€)/gi, (match, euroValue) => {
            const normalizedValue = parseFloat(euroValue.replace(",", ".").replace(/[^0-9.]/g, ""));
            if (isNaN(normalizedValue)) return match;

            let roundedPrice = getAttractivePrice(normalizedValue);

            return `${roundedPrice} DM`;
        });
        if (originalText !== updatedText) {
            node.textContent = updatedText;
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(replaceTextContent);
    }
}

function getAttractivePrice(normalizedValue) {
    let dmPrice = (normalizedValue * 1.95583).toFixed(2);
    let price = parseFloat(dmPrice);
    let roundedPrice;

    let integerPart = Math.floor(price);
    let fractionalPart = price - integerPart;

    // Wenn der Dezimalteil 0,50 oder mehr ist, auf 0,99 runden
    if (fractionalPart >= 0.50) {
        roundedPrice = integerPart + 0.99;
    } else {
        // Wenn der Dezimalteil unter 0,50 ist, auf 0,49 runden
        roundedPrice = integerPart + 0.49;
    }

    if (roundedPrice % 1 >= 0.95) {
        roundedPrice = Math.floor(roundedPrice) + 0.99;
    }

    return roundedPrice.toFixed(2);
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                replaceTextContent(node);
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });

replaceTextContent(document.body);
