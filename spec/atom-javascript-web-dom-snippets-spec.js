'use babel';

import AtomJavascriptWebDomSnippets from '../lib/atom-javascript-web-dom-snippets';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomJavascriptWebDomSnippets', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atom-javascript-web-dom-snippets');
  });

  describe('when the atom-javascript-web-dom-snippets:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.atom-javascript-web-dom-snippets')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-javascript-web-dom-snippets:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.atom-javascript-web-dom-snippets')).toExist();

        let atomJavascriptWebDomSnippetsElement = workspaceElement.querySelector('.atom-javascript-web-dom-snippets');
        expect(atomJavascriptWebDomSnippetsElement).toExist();

        let atomJavascriptWebDomSnippetsPanel = atom.workspace.panelForItem(atomJavascriptWebDomSnippetsElement);
        expect(atomJavascriptWebDomSnippetsPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'atom-javascript-web-dom-snippets:toggle');
        expect(atomJavascriptWebDomSnippetsPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.atom-javascript-web-dom-snippets')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-javascript-web-dom-snippets:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let atomJavascriptWebDomSnippetsElement = workspaceElement.querySelector('.atom-javascript-web-dom-snippets');
        expect(atomJavascriptWebDomSnippetsElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'atom-javascript-web-dom-snippets:toggle');
        expect(atomJavascriptWebDomSnippetsElement).not.toBeVisible();
      });
    });
  });
});
