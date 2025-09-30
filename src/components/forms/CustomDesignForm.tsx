import React, { useEffect, useMemo, useState } from "react";

type Metal = { id: string | number; name: string };

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

const jsonHeaders: HeadersInit = {
  "Content-Type": "application/json",
};

type FetchState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

const initialState: FetchState = { status: "idle", message: "" };

const isValidPhone = (value: string) => value.trim().length >= 7;

const CustomDesignForm: React.FC = () => {


  const [cdState, setCdState] = useState<FetchState>(initialState);
  const [cdForm, setCdForm] = useState({
    customerFname: "",
    customerLname: "",
    email: "",
    contactNumber: "",
    budget: "",
  images: [],
    preferredMetalId: "",
  });

  const canSubmitCD = useMemo(() => {
    return (
      cdForm.customerFname.trim() !== "" &&
      cdForm.customerLname.trim() !== "" &&
      cdForm.email.trim() !== "" &&
      isValidPhone(cdForm.contactNumber) &&
      cdForm.images.length > 0 && cdForm.images.length <= 3
    );
  }, [cdForm]);

  const handleCdSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!canSubmitCD) return;

    setCdState({ status: "loading", message: "Submitting..." });
    try {
      
      const formData = new FormData();
      formData.append("customerFname", cdForm.customerFname.trim());
      formData.append("customerLname", cdForm.customerLname.trim());
      formData.append("email", cdForm.email.trim());
      formData.append("contactNumber", cdForm.contactNumber.trim());
      formData.append("budget", cdForm.budget === "" ? "" : cdForm.budget);
      formData.append("preferredMetalId", cdForm.preferredMetalId === "" ? "" : cdForm.preferredMetalId);
      formData.append("status", "NEW");
      formData.append("assigned_user_id", "");
      cdForm.images.forEach((file, idx) => {
        formData.append(`images`, file);
      });

      const res = await fetch(`${API_BASE}/custom-designs`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `Request failed (${res.status})`);
      }
      setCdForm({
        customerFname: "",
        customerLname: "",
        email: "",
        contactNumber: "",
        budget: "",
        images: [],
        preferredMetalId: "",
      });
      setCdState({ status: "success", message: "Custom design request submitted successfully." });
    } catch (err: any) {
      setCdState({ status: "error", message: err?.message || "Submission failed" });
    }
  };

  return (
  <form onSubmit={handleCdSubmit} onReset={() => { setCdForm({ customerFname: "", customerLname: "", email: "", contactNumber: "", budget: "", images: [], preferredMetalId: "" }); setCdState(initialState); }} noValidate>
      <div className="grid gap-4">
        <div>
          <label htmlFor="cd-first-name" className="block text-sm font-medium">First Name</label>
          <input id="cd-first-name" name="customerFname" type="text" required placeholder="Enter first name" className="mt-1 w-full border rounded px-3 py-2 text-black" value={cdForm.customerFname} onChange={(e) => setCdForm(f => ({ ...f, customerFname: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="cd-last-name" className="block text-sm font-medium">Last Name</label>
          <input id="cd-last-name" name="customerLname" type="text" required placeholder="Enter last name" className="mt-1 w-full border rounded px-3 py-2 text-black" value={cdForm.customerLname} onChange={(e) => setCdForm(f => ({ ...f, customerLname: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="cd-email" className="block text-sm font-medium">Email</label>
          <input id="cd-email" name="email" type="email" required placeholder="name@example.com" className="mt-1 w-full border rounded px-3 py-2 text-black" value={cdForm.email} onChange={(e) => setCdForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="cd-contact" className="block text-sm font-medium">Contact Number</label>
          <input id="cd-contact" name="contactNumber" type="tel" required placeholder="e.g., +1 555 123 4567" className="mt-1 w-full border rounded px-3 py-2 text-black" value={cdForm.contactNumber} onChange={(e) => setCdForm(f => ({ ...f, contactNumber: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="cd-budget" className="block text-sm font-medium">Budget (optional)</label>
          <input id="cd-budget" name="budget" type="number" step="0.01" placeholder="e.g., 499.99" className="mt-1 w-full border rounded px-3 py-2 text-black" value={cdForm.budget} onChange={(e) => setCdForm(f => ({ ...f, budget: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="cd-images" className="block text-sm font-medium">Design Images (max 3)</label>
          <input
            id="cd-images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            required
            className="mt-1 w-full border rounded px-3 py-2"
            onChange={e => {
              const files = Array.from(e.target.files || []).slice(0, 3);
              setCdForm(f => ({ ...f, images: files }));
            }}
          />
          <p className="text-xs text-muted-foreground mt-1">Upload up to 3 design images.</p>
          {cdForm.images.length > 3 && (
            <p className="text-xs text-red-600 mt-1">You can upload a maximum of 3 images.</p>
          )}
        </div>
        
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={!canSubmitCD || cdState.status === "loading"} className="px-4 py-2 rounded bg-black text-white disabled:opacity-60">{cdState.status === "loading" ? "Submitting..." : "Submit"}</button>
          <button type="reset" className="px-4 py-2 rounded border">Reset</button>
        </div>
        {cdState.status === "success" && <p role="status" className="text-green-700 font-semibold">{cdState.message}</p>}
        {cdState.status === "error" && <p role="alert" className="text-red-700 font-semibold">{cdState.message}</p>}
      </div>
    </form>
  );
};

export default CustomDesignForm;


