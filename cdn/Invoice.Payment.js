var Invoice = {
    iFrame: {
        modal: {
            show: (type, id, amount, demo) => {
                document.getElementById('InvoiceContainer').innerHTML = `<div class="modal fade bd-example-modal-lg p-0" id="payInvoiceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" id="invoice-modal-dialog" role="document"><div class="modal-content" id="invoice-modal-content"><div class="modal-body" id="invoice-modal-body"><div id="InvoicePayContainer"/></div></div></div></div>`;
                Invoice.iFrame.inline.show(type, id, amount, demo, true);
            }
        },
        inline: {
            show: (type, id, amount, demo, modal) => {
                const InvoiceContainer = document.getElementById(!modal ? 'InvoiceContainer' : 'InvoicePayContainer');
                const InvoicePaymentFrame = document.createElement('iframe');
                InvoicePaymentFrame.id = 'InvoicePaymentFrame';
                InvoicePaymentFrame.setAttribute('src', `https://${demo ? 'paytest' : 'pay'}.invoice.su/frame/${type === 'order' ?'p': 't'}${id}${type==='terminal' && amount ? `/${amount}` : '' }`);
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
        inline: {
            show: (type, id, amount, modal) => {
               Invoice.iFrame.inline.show(type, id, amount, true);
            }
        },
    }
};

