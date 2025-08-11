// "use client";

// import { useState } from "react";
// import InvestorDashboard from "@/components/investor-dashboard";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { toast } from "sonner"; // Desnecessário se não houver validação

// export default function PainelPage() {
//   const [otp, setOtp] = useState("");
//   const [isVerified, setIsVerified] = useState(false);

//   const handleOtpChange = (value: string) => {
//     setOtp(value);

//     // 🔹 Verificação desativada
//     /*
//     if (value.length === 6) {
//       if (value === "102030") {
//         setIsVerified(true);
//       } else {
//         toast.error("Código incorreto. Tente novamente.");
//         setOtp("");
//       }
//     }
//     */

//     // Agora basta marcar como verificado ao preencher os 6 dígitos
//     if (value.length === 6) {
//       setIsVerified(true);
//     }
//   };

//   if (isVerified) {
//     return <InvestorDashboard />;
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Card className="w-[350px]">
//         <CardHeader>
//           <CardTitle className="text-center">Digite o Código OTP</CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center gap-4">
//           <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
//             <InputOTPGroup>
//               <InputOTPSlot index={0} />
//               <InputOTPSlot index={1} />
//               <InputOTPSlot index={2} />
//               <InputOTPSlot index={3} />
//               <InputOTPSlot index={4} />
//               <InputOTPSlot index={5} />
//             </InputOTPGroup>
//           </InputOTP>

//           <button
//             onClick={() => setOtp("")}
//             className="w-full bg-secondary text-secondary-foreground py-2 rounded-md"
//           >
//             Limpar
//           </button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
