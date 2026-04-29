"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function AddContactPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  
  const [formData, setFormData] = useState({
    // Basic Info
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    taxId: "",
    
    // Contact Person
    contactName: "",
    contactTitle: "",
    contactPhone: "",
    contactEmail: "",
    
    // Address
    city: "",
    addressDetail: "",
    
    // Credit
    creditLimit: "",
    paymentTerms: "",
    category: "General",
    status: "Warm Lead", // Default contact status
    
    // Notes
    notes: ""
  });

  // Load data if in edit mode
  React.useEffect(() => {
    if (editId) {
      const savedContacts = JSON.parse(localStorage.getItem('crm_contacts') || '[]');
      const contactToEdit = savedContacts.find((c: any) => c.id.toString() === editId);
      
      if (contactToEdit) {
        if (contactToEdit.fullData) {
          setFormData(contactToEdit.fullData);
        } else {
          setFormData(prev => ({
            ...prev,
            companyName: contactToEdit.company || "",
            companyEmail: contactToEdit.email || "",
            companyPhone: contactToEdit.phone || "",
            contactName: contactToEdit.name || "",
            contactTitle: contactToEdit.role || "",
            city: contactToEdit.location || "",
            contactEmail: contactToEdit.email || "",
            contactPhone: contactToEdit.phone || "",
            status: contactToEdit.status || "Warm Lead"
          }));
        }
      }
    }
  }, [editId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const savedContacts = JSON.parse(localStorage.getItem('crm_contacts') || '[]');
    
    if (editId) {
      // UPDATE EXISTING
      const updatedContacts = savedContacts.map((c: any) => {
        if (c.id.toString() === editId) {
          return {
            ...c,
            name: formData.contactName,
            role: formData.contactTitle,
            company: formData.companyName,
            email: formData.contactEmail,
            phone: formData.contactPhone,
            location: formData.city,
            status: formData.status,
            initials: formData.contactName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            fullData: formData
          };
        }
        return c;
      });
      localStorage.setItem('crm_contacts', JSON.stringify(updatedContacts));
      toast.success('Contact updated successfully');
    } else {
      // CREATE NEW
      const newContact = {
        id: Date.now(),
        name: formData.contactName,
        role: formData.contactTitle,
        company: formData.companyName,
        email: formData.contactEmail,
        phone: formData.contactPhone,
        location: formData.city,
        status: formData.status,
        lastContact: "Not contacted yet",
        initials: formData.contactName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        fullData: formData 
      };
      localStorage.setItem('crm_contacts', JSON.stringify([...savedContacts, newContact]));
      toast.success('Contact created successfully');
    }
    
    router.push('/contacts');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <form onSubmit={handleSubmit} className="space-y-6 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {editId ? 'Edit Contact' : 'Create New Contact'}
            </h1>
            <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
              {editId ? 'Update existing contact details and profile.' : 'Add a new person to your professional CRM network.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/contacts"
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#a855f7] text-white text-sm font-bold hover:bg-[#9333ea] transition-all shadow-lg shadow-[#a855f7]/20 flex items-center gap-2 cursor-pointer"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Contact
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Section 1: Personal Details */}
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 space-y-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Details</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Full Name</label>
                <input required name="contactName" value={formData.contactName} onChange={handleChange} type="text" placeholder="Contact's full name" className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Job Title</label>
                <input required name="contactTitle" value={formData.contactTitle} onChange={handleChange} type="text" placeholder="e.g. Project Manager" className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Direct Email</label>
                  <input required name="contactEmail" value={formData.contactEmail} onChange={handleChange} type="email" placeholder="contact@email.com" className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Mobile Number</label>
                  <input required name="contactPhone" value={formData.contactPhone} onChange={handleChange} type="tel" placeholder="+1 (000) 000-0000" className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Company Information */}
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 space-y-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Company Association</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Company Name</label>
                <input required name="companyName" value={formData.companyName} onChange={handleChange} type="text" placeholder="Where do they work?" className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Work Email</label>
                  <input name="companyEmail" value={formData.companyEmail} onChange={handleChange} type="email" placeholder="corp@company.com" className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Work Phone</label>
                  <input name="companyPhone" value={formData.companyPhone} onChange={handleChange} type="tel" placeholder="+1 (000) 000-0000" className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Lead Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer placeholder:text-gray-400 dark:placeholder:text-white/20">
                  <option value="Hot Lead">Hot Lead</option>
                  <option value="Warm Lead">Warm Lead</option>
                  <option value="Cold Lead">Cold Lead</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Address Information */}
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 space-y-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Address Information</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">City</label>
                <input required name="city" value={formData.city} onChange={handleChange} type="text" placeholder="e.g. New York, London" className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Full Detailed Address</label>
                <input name="addressDetail" value={formData.addressDetail} onChange={handleChange} type="text" placeholder="Street name, Building No, Office No" className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20" />
              </div>
            </div>
          </div>

          {/* Section 4: Notes */}
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 space-y-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
              <div className="p-2 rounded-lg bg-gray-500/10 text-gray-500">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Additional Notes</h2>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Contact Notes</label>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                rows={5}
                placeholder="Add any specific details about this contact..." 
                className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20 resize-none" 
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
