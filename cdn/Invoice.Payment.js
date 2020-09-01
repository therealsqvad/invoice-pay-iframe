var Invoice = {
    iFrame: {
        modal: {
            show: (type, id, amount, demo) => {
                Invoice.createPaymentContainer();
                const InvoiceContainer = document.getElementById('InvoicePaymentContainer');
                const InvoicePaymentFrame = document.createElement('iframe');
                InvoicePaymentFrame.id = 'InvoicePaymentModal';
                InvoicePaymentFrame.style.width = '100%';
                InvoicePaymentFrame.style.height = '100%';
                InvoicePaymentFrame.style.zIndex = '999999';
                InvoicePaymentFrame.style.position = 'fixed';
                InvoicePaymentFrame.style.top = '0px';
                InvoicePaymentFrame.style.left = '0px';
                InvoicePaymentFrame.setAttribute('src', `https://${demo ? 'paytest' : 'pay'}.invoice.su/modal/${type === 'order' ?'p': 't'}${id}${type==='terminal' && amount ? `/${amount}` : '' }`);
                // InvoicePaymentFrame.setAttribute('src', `https://localhost:3000/modal/${type === 'order' ?'p': 't'}${id}${type==='terminal' && amount ? `/${amount}` : '' }`);
                InvoiceContainer.innerHTML = InvoicePaymentFrame.outerHTML;
            }
        },
        service: {
            show: (service, demo) => {
                Invoice.createPaymentContainer();
                const InvoiceContainer = document.getElementById('InvoicePaymentContainer');
                const InvoicePaymentFrame = document.createElement('iframe');
                InvoicePaymentFrame.id = 'InvoicePaymentModal';
                InvoicePaymentFrame.style.width = '100%';
                InvoicePaymentFrame.style.height = '100%';
                InvoicePaymentFrame.style.zIndex = '999999';
                InvoicePaymentFrame.style.position = 'fixed';
                InvoicePaymentFrame.style.top = '0px';
                InvoicePaymentFrame.style.left = '0px';
                InvoicePaymentFrame.setAttribute('src', `https://${demo ? 'paytest' : 'pay'}.invoice.su/service/t${service}`);
                // InvoicePaymentFrame.setAttribute('src', `https://localhost:3000/service/t${service}`);
                InvoiceContainer.innerHTML = InvoicePaymentFrame.outerHTML;
            }
        },
        inline: {
            show: (type, id, amount, demo) => {
                const InvoiceContainer = document.getElementById('InvoicePaymentContainer');
                const InvoicePaymentFrame = document.createElement('iframe');
                InvoicePaymentFrame.id = 'InvoicePaymentFrame';
                InvoicePaymentFrame.setAttribute('src', `https://${demo ? 'paytest' : 'pay'}.invoice.su/frame/${type === 'order' ?'p': 't'}${id}${type==='terminal' && amount ? `/${amount}` : '' }`);
                // InvoicePaymentFrame.setAttribute('src', `https://localhost:3000/frame/${type === 'order' ?'p': 't'}${id}${type==='terminal' && amount ? `/${amount}` : '' }`);
                InvoiceContainer.innerHTML = InvoicePaymentFrame.outerHTML;
            }
        },
    },
    iFrame_demo: {
        modal: {
            show: (type, id, amount) => {
                Invoice.iFrame.modal.show(type, id, amount, true);
            }
        },
        service: {
            show: (service) => {
                Invoice.iFrame.service.show(service, true)
            }
        },
        inline: {
            show: (type, id, amount, modal) => {
                Invoice.iFrame.inline.show(type, id, amount, true);
            }
        },
    },
    closeModal: () => document.getElementById('InvoicePaymentContainer').innerHTML = '',
    init: () => {
        if (window.addEventListener) {
            window.addEventListener("message", listener, false);
        } else {
            // IE8
            window.attachEvent("onmessage", listener);
        }
    },
    createPaymentContainer: () => {
        if (!document.getElementById('InvoicePaymentContainer')) {
            const InvoiceContainer = document.createElement('div');
            InvoiceContainer.id = 'InvoicePaymentContainer';
            document.body.appendChild(InvoiceContainer);
        }
    }
};

function listener(event) {
    if (event.data === 'InvoiceCloseModal') {
        Invoice.closeModal();
    }
}

Invoice.init();