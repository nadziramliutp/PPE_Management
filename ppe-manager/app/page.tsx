import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { ClipboardList, LayoutDashboard, Box } from "lucide-react";

export default function Home() {
  return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          PPE Management
        </h1>
        <p className="text-slate-500 mt-2">Select a module to continue</p>
      </div>
      
      {/* Button Grid */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        
        {/* 1. PPE Issuance (Employee/Staff) */}
        <Link href="/ppe-issuance" 
          className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all active:scale-95 group">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-500 transition-colors">
            <ClipboardList className="text-blue-600 group-hover:text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900">PPE Issuance</h2>
            <p className="text-slate-500 text-sm">Issue items to employees</p>
          </div>
        </Link>

        {/* 2. Admin Dashboard (HSE Dept) */}
        <Link href="/admin" 
          className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all active:scale-95 group">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-orange-500 transition-colors">
            <LayoutDashboard className="text-orange-600 group-hover:text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900">Admin Dashboard</h2>
            <p className="text-slate-500 text-sm">Manage stocks & reports</p>
          </div>
        </Link>

        {/* 3. Quick Inventory (General View) */}
        <Link href="/inventory" 
          className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all active:scale-95 group">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-emerald-500 transition-colors">
            <Box className="text-emerald-600 group-hover:text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-900">Inventory Status</h2>
            <p className="text-slate-500 text-sm">Check current stock levels</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
