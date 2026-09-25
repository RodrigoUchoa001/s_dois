import { couple } from "../../data/couple";

export function Home() {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="mb-2 text-sm text-white/60">
                        Nossa história
                    </p>

                    <h1 className="text-4xl font-bold">
                        {couple.names.man} & {couple.names.woman}
                    </h1>

                    <p className="mt-4 text-white/60">
                        Desde {couple.startDate}
                    </p>

                    <img src="/images/mnl.jpg" alt="aaaa" />
                </div>
            </section>
        </main>
    );
}