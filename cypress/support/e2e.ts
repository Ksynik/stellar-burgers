// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  cy.window().then((win) => {
    const w = win as any;
    if (w.__overlayRemoverInstalled) return;
    w.__overlayRemoverInstalled = true;

    const removerCode = `
			(function(){
				function removeOverlay(){
					try{
						const f = document.getElementById('webpack-dev-server-client-overlay');
						if(f && f.parentNode) f.parentNode.removeChild(f);
						let s = document.getElementById('cypress-overlay-style');
						if(!s){
							s = document.createElement('style');
							s.id = 'cypress-overlay-style';
							s.innerHTML = '#webpack-dev-server-client-overlay{display:none !important; pointer-events:none !important; visibility:hidden !important;}';
							document.head.appendChild(s);
						}
					}catch(e){}
				}
				removeOverlay();
				try{
					new MutationObserver(removeOverlay).observe(document.documentElement,{childList:true,subtree:true});
				}catch(e){}
				// Fallback polling
				setInterval(removeOverlay, 1000);
			})();
		`;

    const script = win.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = removerCode;
    win.document.head.appendChild(script);
  });
});
