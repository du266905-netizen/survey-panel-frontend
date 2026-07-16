let domSafetyInstalled = false;

function isNodeMismatchError(error) {
  return error?.name === 'NotFoundError' || /node|removeChild|insertBefore/i.test(String(error?.message || ''));
}

export function installDomMutationSafety() {
  if (domSafetyInstalled || typeof window === 'undefined' || !window.Node?.prototype) return;
  domSafetyInstalled = true;

  const originalRemoveChild = window.Node.prototype.removeChild;
  const originalInsertBefore = window.Node.prototype.insertBefore;

  window.Node.prototype.removeChild = function safeRemoveChild(child) {
    try {
      if (child && child.parentNode !== this) return child;
      return originalRemoveChild.call(this, child);
    } catch (error) {
      if (isNodeMismatchError(error)) return child;
      throw error;
    }
  };

  window.Node.prototype.insertBefore = function safeInsertBefore(newNode, referenceNode) {
    try {
      if (referenceNode && referenceNode.parentNode !== this) {
        return this.appendChild(newNode);
      }
      return originalInsertBefore.call(this, newNode, referenceNode);
    } catch (error) {
      if (isNodeMismatchError(error)) return this.appendChild(newNode);
      throw error;
    }
  };
}
