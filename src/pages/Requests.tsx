import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";

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

const Requests: React.FC = () => {
  const [metals, setMetals] = useState<Metal[]>([]);
  const [loadingMetals, setLoadingMetals] = useState(false);
  const [metalError, setMetalError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoadingMetals(true);
        setMetalError(null);
        const res = await fetch(`${API_BASE}/metals`, { credentials: "include" });
        if (!res.ok) throw new Error(`Failed to load metals (${res.status})`);
        const data = await res.json();
        if (isMounted) setMetals(Array.isArray(data) ? data : data?.content ?? []);
      } catch (err: any) {
        if (isMounted) setMetalError(err?.message || "Unable to load metals");
      } finally {
        if (isMounted) setLoadingMetals(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Custom Design form state
  const [cdState, setCdState] = useState<FetchState>(initialState);
  const [cdForm, setCdForm] = useState({
    customerFname: "",
    customerLname: "",
    email: "",
    contactNumber: "",
    budget: "",
    image: "",
    preferredMetalId: "",
  });

  const canSubmitCD = useMemo(() => {
    return (
      cdForm.customerFname.trim() !== "" &&
      cdForm.customerLname.trim() !== "" &&
      cdForm.email.trim() !== "" &&
      isValidPhone(cdForm.contactNumber) &&
      cdForm.image.trim() !== ""
    );
  }, [cdForm]);

  const handleCdSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!canSubmitCD) return;

    setCdState({ status: "loading", message: "Submitting..." });
    try {
      const payload = {
        customerFname: cdForm.customerFname.trim(),
        customerLname: cdForm.customerLname.trim(),
        email: cdForm.email.trim(),
        contactNumber: cdForm.contactNumber.trim(),
        budget: cdForm.budget === "" ? null : Number(cdForm.budget),
        image: cdForm.image.trim(),
        preferredMetalId: cdForm.preferredMetalId === "" ? null : cdForm.preferredMetalId,
        status: "NEW",
        assigned_user_id: null,
      };

      const res = await fetch(`${API_BASE}/custom-designs`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify(payload),
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
        image: "",
        preferredMetalId: "",
      });
      setCdState({ status: "success", message: "Custom design request submitted successfully." });
    } catch (err: any) {
      setCdState({ status: "error", message: err?.message || "Submission failed" });
    }
  };

  // Service Ticket form state
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
    <Layout>
      <section className="container mx-auto px-4 py-10 grid gap-10 md:grid-cols-2">
        <article aria-labelledby="custom-design-heading" className="p-6 rounded-lg border">
          <h2 id="custom-design-heading" className="text-2xl font-semibold mb-4">Custom Design Request</h2>
          <form onSubmit={handleCdSubmit} onReset={() => { setCdForm({ customerFname: "", customerLname: "", email: "", contactNumber: "", budget: "", image: "", preferredMetalId: "" }); setCdState(initialState); }} noValidate>
            <div className="grid gap-4">
              <div>
                <label htmlFor="cd-first-name" className="block text-sm font-medium">First Name</label>
                <input id="cd-first-name" name="customerFname" type="text" required placeholder="Enter first name" className="mt-1 w-full border rounded px-3 py-2" value={cdForm.customerFname} onChange={(e) => setCdForm(f => ({ ...f, customerFname: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="cd-last-name" className="block text-sm font-medium">Last Name</label>
                <input id="cd-last-name" name="customerLname" type="text" required placeholder="Enter last name" className="mt-1 w-full border rounded px-3 py-2" value={cdForm.customerLname} onChange={(e) => setCdForm(f => ({ ...f, customerLname: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="cd-email" className="block text-sm font-medium">Email</label>
                <input id="cd-email" name="email" type="email" required placeholder="name@example.com" className="mt-1 w-full border rounded px-3 py-2" value={cdForm.email} onChange={(e) => setCdForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="cd-contact" className="block text-sm font-medium">Contact Number</label>
                <input id="cd-contact" name="contactNumber" type="tel" required placeholder="e.g., +1 555 123 4567" className="mt-1 w-full border rounded px-3 py-2" value={cdForm.contactNumber} onChange={(e) => setCdForm(f => ({ ...f, contactNumber: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="cd-budget" className="block text-sm font-medium">Budget (optional)</label>
                <input id="cd-budget" name="budget" type="number" step="0.01" placeholder="e.g., 499.99" className="mt-1 w-full border rounded px-3 py-2" value={cdForm.budget} onChange={(e) => setCdForm(f => ({ ...f, budget: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="cd-image" className="block text-sm font-medium">Design Image URL</label>
                <input id="cd-image" name="image" type="url" required placeholder="https://example.com/design.jpg" className="mt-1 w-full border rounded px-3 py-2" value={cdForm.image} onChange={(e) => setCdForm(f => ({ ...f, image: e.target.value }))} />
                <p className="text-xs text-muted-foreground mt-1">Upload your image to storage and paste the URL here.</p>
              </div>
              <div>
                <label htmlFor="cd-metal" className="block text-sm font-medium">Preferred Metal (optional)</label>
                <select id="cd-metal" name="preferredMetalId" className="mt-1 w-full border rounded px-3 py-2" value={cdForm.preferredMetalId} onChange={(e) => setCdForm(f => ({ ...f, preferredMetalId: e.target.value }))} disabled={loadingMetals || !!metalError}>
                  <option value="">Select a metal (optional)</option>
                  {metals.map((m) => (
                    <option key={String(m.id)} value={String(m.id)}>{m.name}</option>
                  ))}
                </select>
                {metalError && <p className="text-sm text-red-600 mt-1">{metalError}</p>}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={!canSubmitCD || cdState.status === "loading"} className="px-4 py-2 rounded bg-black text-white disabled:opacity-60">{cdState.status === "loading" ? "Submitting..." : "Submit"}</button>
                <button type="reset" className="px-4 py-2 rounded border">Reset</button>
              </div>
              {cdState.status === "success" && <p role="status" className="text-green-700">{cdState.message}</p>}
              {cdState.status === "error" && <p role="alert" className="text-red-700">{cdState.message}</p>}
            </div>
          </form>
        </article>

        <article aria-labelledby="service-ticket-heading" className="p-6 rounded-lg border">
          <h2 id="service-ticket-heading" className="text-2xl font-semibold mb-4">Service Ticket</h2>
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
        </article>
      </section>
    </Layout>
  );
};

export default Requests;


