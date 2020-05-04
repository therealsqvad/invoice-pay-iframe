var Invoice = {
    iFrame: {
        modal: {
            show: (orderId) => {
                document.getElementById('InvoiceContainer').innerHTML = `<div class="modal fade bd-example-modal-lg p-0" id="payInvoiceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" id="invoice-modal-dialog" role="document"><div class="modal-content" id="invoice-modal-content"><div class="modal-body" id="invoice-modal-body"><div id="InvoicePayContainer"/></div></div></div></div>`
                const InvoiceContainer = document.getElementById('InvoicePayContainer');
                const InvoicePaymentFrame = document.createElement('iframe');
                InvoicePaymentFrame.id = 'InvoicePaymentFrame';
                InvoicePaymentFrame.setAttribute('src', `https://paytest.invoice.su/frame/p${orderId}`);
                InvoiceContainer.innerHTML = InvoicePaymentFrame.outerHTML;
            }
        },
        inline: {
            show: (orderId) => {
                const InvoiceContainer = document.getElementById('InvoiceContainer');
                const InvoicePaymentFrame = document.createElement('iframe');
                InvoicePaymentFrame.id = 'InvoicePaymentFrame';
                InvoicePaymentFrame.setAttribute('src', `https://paytest.invoice.su/frame/p${orderId}`);
                InvoiceContainer.innerHTML = InvoicePaymentFrame.outerHTML;
            }
        }
    }
};
