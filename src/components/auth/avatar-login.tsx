
"use client";

import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface AvatarLoginProps {
  users: User[];
  onSelect: (user: User) => void;
}

export function AvatarLogin({ users, onSelect }: AvatarLoginProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-xl border-none shadow-2xl bg-card">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-4 bg-primary p-3 rounded-xl w-fit">
            <Calculator className="w-8 h-8 text-accent" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome to QS Flow</CardTitle>
          <CardDescription className="text-lg">Select your profile to begin your workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => onSelect(user)}
                className="group flex flex-col items-center gap-3 transition-all hover:scale-105"
              >
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-transparent group-hover:border-accent transition-all shadow-lg">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="text-center">
                  <p className="font-semibold group-hover:text-accent transition-colors">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
