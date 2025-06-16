import { UserNav } from "@/components/app/user-nav";
import { CardDescription, CardTitle } from "@/components/ui/card";

export function Header() {
  return (
    <header className="bg-card text-card-foreground flex justify-between gap-6 rounded-xl border px-3 py-6 shadow-sm">
      <section className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
        <CardTitle className="text-foreground">DFcom</CardTitle>
        <CardDescription className="text-muted-foreground">
          Gerencie os produtos da sua loja
        </CardDescription>
      </section>

      <UserNav />
    </header>
  );
}
