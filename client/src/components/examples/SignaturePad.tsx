import { useState } from "react";
import SignaturePad from '../SignaturePad';

export default function SignaturePadExample() {
  const [signature, setSignature] = useState("");

  return (
    <div className="p-6 max-w-md space-y-4">
      <h3 className="font-semibold">Signature Pad Example</h3>
      <SignaturePad onSave={setSignature} existingSignature={signature} />
      
      {signature && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Saved Signature:</p>
          <img src={signature} alt="Saved signature" className="border rounded p-2 h-20 object-contain" />
        </div>
      )}
    </div>
  );
}
