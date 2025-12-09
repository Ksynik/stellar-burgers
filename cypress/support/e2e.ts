import './commands';

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
