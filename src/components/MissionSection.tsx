'use client';
import Image from 'next/image';

export default function MissionSection() {
  return (
    <section className="my-16 px-4 md:px-8 max-w-6xl mx-auto bg-white border border-[#E5E5E5] rounded-2xl shadow-sm">
      <article className="grid md:grid-cols-2 gap-8 items-center">
        
        <section aria-labelledby="mission-heading">
          
          <h2
            id="mission-heading"
            className="text-3xl font-bold text-[#2A2A2A] mb-4"
          >
            Ajuda Social - <span className="text-[#E9C46A]">Conectando</span>
          </h2>

          <p className="text-lg text-[#555] mb-6">
            <strong>
              Conectando pessoas em situação de vulnerabilidade a serviços essenciais
            </strong>
          </p>

          <h3 className="text-xl font-semibold text-[#E9C46A] mb-2">
            🎯 Missão
          </h3>

          <p className="font-medium text-[#555] mb-4">
            Ajuda Social - Conectando é uma solução tecnológica criada para conectar
            pessoas em situação de vulnerabilidade social como moradores de rua,
            desabrigados ou indivíduos em risco a serviços de apoio essenciais.
          </p>

          <p className="font-medium text-[#555] mb-4">
            Muitas vezes, ao nos depararmos com alguém que precisa de ajuda, não sabemos
            como agir ou quais instituições podem auxiliar. Esta página centraliza
            informações sobre locais e organizações que oferecem suporte nas áreas de:
          </p>

          <ul className="list-disc list-inside font-medium text-[#555] mb-4 space-y-1">
            <li>🍛 Alimentação (restaurantes populares, bancos de alimentos)</li>
            <li>🏠 Abrigo e moradia temporária</li>
            <li>🩺 Assistência médica e psicológica</li>
            <li>📝 Ajuda jurídica e documentação</li>
          </ul>

          <blockquote className="italic font-medium text-[#444] border-l-4 pl-4 border-[#E9C46A]">
            {"Facilitar o acesso a recursos que salvam vidas, conectando quem precisa de ajuda a quem pode oferecer."}
          </blockquote>

        </section>

        <figure className="relative w-[450px] aspect-[4/4]">
          <Image
            src="/mission-illustration.png"
            alt="Ilustração de ajuda social"
            fill
            className="rounded-xl shadow-md object-cover"
          />
        </figure>

      </article>
    </section>
  );
}