import React, { useMemo, useState } from "react";

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

const ServiceTicketForm: React.FC = () => {
  const [stState, setStState] = useState<FetchState>(initialState);
  const [stForm, setStForm] = useState({
    customerFname: "",
    customerLname: "",
    email: "",
    contactNumber: "",
    serviceType: "CLEANING",
    preferredDate: "",
    note: "",
  });

  const canSubmitST = useMemo(() => {
    return (
      stForm.customerFname.trim() !== "" &&
      stForm.customerLname.trim() !== "" &&
      stForm.email.trim() !== "" &&
      isValidPhone(stForm.contactNumber)
    );
  }, [stForm]);

  const handleStSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!canSubmitST) return;

    setStState({ status: "loading", message: "Submitting..." });
    try {
      const payload = {
        customerFname: stForm.customerFname.trim(),
        customerLname: stForm.customerLname.trim(),
        email: stForm.email.trim(),
        contactNumber: stForm.contactNumber.trim(),
        serviceType: stForm.serviceType,
        preferredDate: stForm.preferredDate === "" ? null : stForm.preferredDate,
        note: stForm.note.trim() === "" ? null : stForm.note.trim(),
        status: "NEW",
        branch_id: null,
        assigned_user_id: null,
      };

      const res = await fetch(`${API_BASE}/tickets`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `Request failed (${res.status})`);
      }
      setStForm({
        customerFname: "",
        customerLname: "",
        email: "",
        contactNumber: "",
        serviceType: "CLEANING",
        preferredDate: "",
        note: "",
      });
      setStState({ status: "success", message: "Service ticket submitted successfully." });
    } catch (err: any) {
      setStState({ status: "error", message: err?.message || "Submission failed" });
    }
  };

  return (
    <form onSubmit={handleStSubmit} onReset={() => { setStForm({ customerFname: "", customerLname: "", email: "", contactNumber: "", serviceType: "CLEANING", preferredDate: "", note: "" }); setStState(initialState); }} noValidate>
      <div className="grid gap-4">
        <div>
          <label htmlFor="st-first-name" className="block text-sm font-medium">First Name</label>
          <input id="st-first-name" name="customerFname" type="text" required placeholder="Enter first name" className="mt-1 w-full border rounded px-3 py-2" value={stForm.customerFname} onChange={(e) => setStForm(f => ({ ...f, customerFname: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="st-last-name" className="block text-sm font-medium">Last Name</label>
          <input id="st-last-name" name="customerLname" type="text" required placeholder="Enter last name" className="mt-1 w-full border rounded px-3 py-2" value={stForm.customerLname} onChange={(e) => setStForm(f => ({ ...f, customerLname: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="st-email" className="block text-sm font-medium">Email</label>
          <input id="st-email" name="email" type="email" required placeholder="name@example.com" className="mt-1 w-full border rounded px-3 py-2" value={stForm.email} onChange={(e) => setStForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="st-contact" className="block text-sm font-medium">Contact Number</label>
          <input id="st-contact" name="contactNumber" type="tel" required placeholder="e.g., +1 555 123 4567" className="mt-1 w-full border rounded px-3 py-2" value={stForm.contactNumber} onChange={(e) => setStForm(f => ({ ...f, contactNumber: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="st-type" className="block text-sm font-medium">Service Type</label>
          <select id="st-type" name="serviceType" className="mt-1 w-full border rounded px-3 py-2" value={stForm.serviceType} onChange={(e) => setStForm(f => ({ ...f, serviceType: e.target.value }))}>
            <option value="CLEANING">CLEANING</option>
            <option value="REPAIR">REPAIR</option>
          </select>
        </div>
        <div>
          <label htmlFor="st-date" className="block text-sm font-medium">Preferred Date (optional)</label>
          <input id="st-date" name="preferredDate" type="date" className="mt-1 w-full border rounded px-3 py-2" value={stForm.preferredDate} onChange={(e) => setStForm(f => ({ ...f, preferredDate: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="st-note" className="block text-sm font-medium">Note (optional)</label>
          <textarea id="st-note" name="note" rows={4} placeholder="Provide additional details" className="mt-1 w-full border rounded px-3 py-2" value={stForm.note} onChange={(e) => setStForm(f => ({ ...f, note: e.target.value }))} />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={!canSubmitST || stState.status === "loading"} className="px-4 py-2 rounded bg-black text-white disabled:opacity-60">{stState.status === "loading" ? "Submitting..." : "Submit"}</button>
          <button type="reset" className="px-4 py-2 rounded border">Reset</button>
        </div>
        {stState.status === "success" && <p role="status" className="text-green-700">{stState.message}</p>}
        {stState.status === "error" && <p role="alert" className="text-red-700">{stState.message}</p>}
      </div>
    </form>
  );
};

export default ServiceTicketForm;


