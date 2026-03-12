// import React, { useState } from 'react';
// import { 
//   Wallet, 
// //   ArrowUpRight, 
//   ArrowDownLeft, 
//   ArrowRightLeft, 
//   CreditCard, 
//   Plus, 
//   History, 
//   Search,
//   ShieldCheck,
// //   MoreVertical
// } from 'lucide-react';
// import { usePayment } from '../../hooks/usePayment.ts';
// // import { Card, CardBody } from '../../components/ui/Card';
// import { Button } from '../../components/ui/Button';
// import { Badge } from '../../components/ui/Badge';

// export const PaymentHub: React.FC<{ role: 'investor' | 'entrepreneur' }> = ({ role }) => {
//   const { balance, transactions, deposit, withdraw, fundProject } = usePayment();
//   const [showStripeModal, setShowStripeModal] = useState(false);
//   const [amount, setAmount] = useState('');

//   // --- Handlers ---
//   const handlePaymentSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!amount || parseFloat(amount) <= 0) return;

//     if (role === 'investor') {
//       deposit(parseFloat(amount));
//     } else {
//       withdraw(parseFloat(amount));
//     }
    
//     setShowStripeModal(false);
//     setAmount('');
//     alert(`Success! Transaction of $${amount} processed.`);
//   };

//   return (
//     <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Hub</h1>
//           <p className="text-slate-500 text-sm mt-1 italic">Secure wallet management and capital flow tracking.</p>
//         </div>
//         <div className="flex gap-3">
//           {role === 'investor' ? (
//             <Button onClick={() => setShowStripeModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-6 flex items-center gap-2 shadow-lg shadow-indigo-200">
//               <Plus size={20} /> Add Funds
//             </Button>
//           ) : (
//             <Button onClick={() => setShowStripeModal(true)} className="bg-slate-900 hover:bg-black text-white rounded-xl px-6 py-6 flex items-center gap-2 shadow-lg shadow-slate-200">
//               <ArrowDownLeft size={20} /> Withdraw
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Wallet Cards Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* Main Wallet Card (Modern Gradient) */}
//         <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 rounded-[2.5rem] p-10 text-white shadow-2xl">
//           <div className="relative z-10 flex flex-col h-full justify-between">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-indigo-100 text-sm font-medium opacity-80 mb-1 tracking-widest uppercase">Available Balance</p>
//                 <h2 className="text-5xl font-black">${balance.toLocaleString()}</h2>
//               </div>
//               <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
//                 <Wallet size={32} />
//               </div>
//             </div>
            
//             <div className="mt-12 flex items-center gap-6">
//               <div className="flex -space-x-3">
//                 {[1,2,3].map(i => (
//                   <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-500 bg-slate-200" />
//                 ))}
//                 <div className="w-10 h-10 rounded-full border-2 border-indigo-500 bg-indigo-400 flex items-center justify-center text-[10px] font-bold">+12</div>
//               </div>
//               <p className="text-indigo-100 text-xs">Active stakeholders connected to your wallet.</p>
//             </div>
//           </div>
//           {/* Decorative Circles */}
//           <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
//           <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl" />
//         </div>

//         {/* Quick Stats Card */}
//         <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <h3 className="font-bold text-slate-800">Account Security</h3>
//               <ShieldCheck className="text-emerald-500" size={24} />
//             </div>
//             <div className="space-y-4">
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-500">Monthly Limit</span>
//                 <span className="font-bold text-slate-800">$2.5M</span>
//               </div>
//               <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                 <div className="bg-indigo-500 h-full w-[40%]" />
//               </div>
//               <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-bold tracking-widest">Verification Status: Level 3 Verified</p>
//             </div>
//           </div>
//           <Button variant="outline" className="w-full rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50">View Analytics</Button>
//         </div>

//       </div>

//       {/* Transaction Table Section (Stripe Style) */}
//       <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">

//         <div className="p-6 border-b border-slate-50 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-slate-50 rounded-lg"><History size={20} className="text-slate-600" /></div>
//             <h3 className="font-bold text-slate-800 tracking-tight">Transaction History</h3>
//           </div>
//           <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
//             <Search size={16} className="text-slate-400" />
//             <input type="text" placeholder="Search payments..." className="bg-transparent border-none outline-none text-sm w-48" />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
//                 <th className="px-8 py-4">Status</th>
//                 <th className="px-8 py-4">Transaction Details</th>
//                 <th className="px-8 py-4">Type</th>
//                 <th className="px-8 py-4">Date</th>
//                 <th className="px-8 py-4 text-right">Amount</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {transactions.map((tx) => (
//                 <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
//                   <td className="px-8 py-5">
//                     <Badge variant={tx.status === 'Completed' ? 'success' : 'warning'}>
//                       {tx.status}
//                     </Badge>
//                   </td>
//                   <td className="px-8 py-5">
//                     <div>
//                       <p className="text-sm font-bold text-slate-800">{tx.sender} → {tx.receiver}</p>
//                       <p className="text-[10px] text-slate-400 font-mono">ID: {tx.id.toUpperCase()}</p>
//                     </div>
//                   </td>
//                   <td className="px-8 py-5">
//                     <div className="flex items-center gap-2 text-sm text-slate-600">
//                       {tx.type === 'Funding' ? <ArrowRightLeft size={14} className="text-indigo-500" /> : <CreditCard size={14} />}
//                       {tx.type}
//                     </div>
//                   </td>
//                   <td className="px-8 py-5 text-sm text-slate-500 font-medium">{tx.date}</td>
//                   <td className={`px-8 py-5 text-right font-bold text-sm ${tx.type === 'Deposit' ? 'text-emerald-600' : 'text-slate-900'}`}>
//                     {tx.type === 'Deposit' ? '+' : '-'}${tx.amount.toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>

//       {/* --- MOCK STRIPE MODAL --- */}
//       {showStripeModal && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
//           <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-300">

//             <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
//               <div>
//                 <h3 className="text-xl font-bold">Secure Payment</h3>
//                 <p className="text-slate-400 text-xs mt-1 italic">Powered by Stripe Simulation</p>
//               </div>
//               <CreditCard size={32} className="text-indigo-400" />
//             </div>

//             <form onSubmit={handlePaymentSubmit} className="p-8 space-y-6">
//               <div>
//                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Amount (USD)</label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
//                   <input 
//                     type="number" 
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     placeholder="0.00"
//                     className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-8 pr-4 font-bold text-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Card Details</label>
//                 <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4">
//                   <input type="text" placeholder="Card Number: 4242 4242 4242 4242" className="w-full bg-transparent border-none outline-none text-sm font-mono" />
//                   <div className="flex gap-4 border-t border-slate-200 pt-4">
//                     <input type="text" placeholder="MM/YY" className="w-1/2 bg-transparent border-none outline-none text-sm font-mono" />
//                     <input type="text" placeholder="CVC" className="w-1/2 bg-transparent border-none outline-none text-sm font-mono" />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <Button type="button" variant="outline" onClick={() => setShowStripeModal(false)} className="flex-1 rounded-xl py-6">Cancel</Button>
//                 <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-bold shadow-lg shadow-indigo-100">
//                   {role === 'investor' ? 'Pay Now' : 'Process'}
//                 </Button>
//               </div>
              
//               <p className="text-[10px] text-center text-slate-400">
//                 Your payment data is encrypted with 256-bit SSL. <br/> This is a simulated environment.
//               </p>
//             </form>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// ===============================================================

import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowRightLeft, 
  CreditCard, 
  Plus, 
  History, 
  // Search,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { usePayment } from '../../hooks/usePayment'; // Ensure path is correct
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const PaymentHub: React.FC<{ role: 'investor' | 'entrepreneur' }> = ({ role }) => {
  // 1. Context Destructuring
  const { 
    investorBalance, 
    entrepreneurBalance, 
    transactions, 
    bills, 
    deposit, 
    withdraw, 
    createBill, 
    payBill 
  } = usePayment();

  // 2. Local States for Modals
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  const [showBillModal, setShowBillModal] = useState(false);
  const [billTitle, setBillTitle] = useState('');
  const [billAmount, setBillAmount] = useState('');

  // 3. Dynamic Balance Evaluation
  const currentBalance = role === 'investor' ? investorBalance : entrepreneurBalance;

  // --- Handlers ---
  const handleBankTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;

    if (transactionType === 'deposit') {
      deposit(val, role);
      alert(`Success! $${val} deposited to your wallet.`);
    } else {
      withdraw(val, role);
    }
    
    setShowStripeModal(false);
    setAmount('');
  };

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(billAmount);
    if (!val || val <= 0 || !billTitle) return;

    createBill(val, billTitle);
    setShowBillModal(false);
    setBillTitle('');
    setBillAmount('');
    alert("Funding request (Bill) created successfully!");
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Hub</h1>
          <p className="text-slate-500 text-sm mt-1 italic">
            {role === 'investor' ? 'Manage your venture capital and fund startups.' : 'Manage your startup funds and request capital.'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => { setTransactionType('deposit'); setShowStripeModal(true); }} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-5 flex items-center gap-2 shadow-lg shadow-indigo-200"
          >
            <ArrowUpRight size={18} /> Deposit
          </Button>
          <Button 
            onClick={() => { setTransactionType('withdraw'); setShowStripeModal(true); }} 
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl px-5 py-5 flex items-center gap-2"
          >
            <ArrowDownLeft size={18} /> Withdraw
          </Button>
        </div>
      </div>

      {/* --- WALLET & STATS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Wallet Card */}
        <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-100 text-sm font-medium opacity-80 mb-1 tracking-widest uppercase">Available Balance</p>
                <h2 className="text-5xl font-black tracking-tighter">${currentBalance.toLocaleString()}</h2>
              </div>
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <Wallet size={32} />
              </div>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-500 bg-slate-200" />
                ))}
              </div>
              <p className="text-indigo-100 text-xs">Secured by industry-standard encryption.</p>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl" />
        </div>

        {/* Security / Info Card */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Account Status</h3>
              <ShieldCheck className="text-emerald-500" size={24} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Role</span>
                <span className="font-bold text-slate-800 capitalize">{role}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[100%]" />
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-bold tracking-widest">Fully Verified Entity</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FUNDING REQUESTS (BILLS) SECTION --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg"><FileText size={20} className="text-indigo-600" /></div>
            <div>
              <h3 className="font-bold text-slate-800 tracking-tight">Funding Requests (Bills)</h3>
              <p className="text-xs text-slate-500">Manage capital injections and invoices.</p>
            </div>
          </div>
          {role === 'entrepreneur' && (
            <Button onClick={() => setShowBillModal(true)} size="sm" className="bg-slate-900 hover:bg-black text-white rounded-lg">
              <Plus size={16} className="mr-2" /> Create Request
            </Button>
          )}
        </div>

        {bills.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">No funding requests available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bills.map(bill => (
              <div key={bill.id} className="border border-slate-100 rounded-2xl p-5 hover:border-indigo-100 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={bill.status === 'Paid' ? 'success' : 'warning'}>
                    {bill.status === 'Paid' ? <CheckCircle2 size={12} className="mr-1 inline" /> : <Clock size={12} className="mr-1 inline" />}
                    {bill.status}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">{bill.id}</span>
                </div>
                <h4 className="font-bold text-slate-800 mb-1">{bill.title}</h4>
                <p className="text-2xl font-black text-slate-900 mb-4">${bill.amount.toLocaleString()}</p>
                
                {role === 'investor' && bill.status === 'Unpaid' && (
                  <Button onClick={() => payBill(bill.id)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3">
                    Pay Now
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- TRANSACTION TABLE SECTION --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg"><History size={20} className="text-slate-600" /></div>
            <h3 className="font-bold text-slate-800 tracking-tight">Transaction History</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Transaction Details</th>
                <th className="px-8 py-4">Type</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <Badge variant={tx.status === 'Completed' ? 'success' : 'warning'}>{tx.status}</Badge>
                  </td>
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{tx.sender} → {tx.receiver}</p>
                      <p className="text-[10px] text-slate-400 font-mono">ID: {tx.id}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      {tx.type === 'Funding' ? <ArrowRightLeft size={14} className="text-indigo-500" /> : <CreditCard size={14} />}
                      {tx.type}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">{tx.date}</td>
                  <td className={`px-8 py-5 text-right font-bold text-sm ${tx.type === 'Deposit' || (tx.type === 'Funding' && tx.receiver.toLowerCase() === role) ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.type === 'Deposit' || (tx.type === 'Funding' && tx.receiver.toLowerCase() === role) ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- STRIPE MODAL (Deposit/Withdraw) --- */}
      {showStripeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className={`p-8 text-white flex justify-between items-center ${transactionType === 'deposit' ? 'bg-slate-900' : 'bg-rose-600'}`}>
              <div>
                <h3 className="text-xl font-bold capitalize">{transactionType} Funds</h3>
                <p className="text-white/70 text-xs mt-1 italic">Secure Gateway Simulation</p>
              </div>
              <CreditCard size={32} className="text-white/50" />
            </div>

            <form onSubmit={handleBankTransaction} className="p-8 space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-8 pr-4 font-bold text-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {transactionType === 'deposit' && (
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Bank / Card Details</label>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4">
                    <input type="text" placeholder="Card Number: 4242 4242 4242 4242" className="w-full bg-transparent border-none outline-none text-sm font-mono" />
                    <div className="flex gap-4 border-t border-slate-200 pt-4">
                      <input type="text" placeholder="MM/YY" className="w-1/2 bg-transparent border-none outline-none text-sm font-mono" />
                      <input type="text" placeholder="CVC" className="w-1/2 bg-transparent border-none outline-none text-sm font-mono" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowStripeModal(false)} className="flex-1 rounded-xl py-6">Cancel</Button>
                <Button type="submit" className={`flex-1 text-white rounded-xl py-6 font-bold shadow-lg ${transactionType === 'deposit' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'}`}>
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CREATE BILL MODAL (Entrepreneur Only) --- */}
      {showBillModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl p-8 animate-in zoom-in duration-300">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Request Funding</h3>
            <p className="text-slate-500 text-sm mb-6">Create a bill to request capital from your investors.</p>
            
            <form onSubmit={handleCreateBill} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Milestone / Title</label>
                <input 
                  type="text" 
                  value={billTitle}
                  onChange={(e) => setBillTitle(e.target.value)}
                  placeholder="e.g. Seed Round Tranche 1"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Amount Required (USD)</label>
                <input 
                  type="number" 
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="50000"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 font-bold text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowBillModal(false)} className="flex-1 rounded-xl py-4">Cancel</Button>
                <Button type="submit" className="flex-1 bg-slate-900 hover:bg-black text-white rounded-xl py-4 font-bold">Create Bill</Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
