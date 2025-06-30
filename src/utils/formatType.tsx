export function formatType(types: string[]): string {
  const palavrasChave = [
    'abrigo',
    'alimentacao',
    'juridico',
    'apoio psicologico',
    'apoio para dependentes',
    'idosos',
    'apoio socioassistencial',
    'orientação',
    'mulheres',
    'documentacao',
    'defensoria pública',
    'preço baixo',
    'ajuda psicossocial',
    'álcool',
    'drogas'
  ];

  const encontrados = types
    .map((tipo) =>
      palavrasChave.find((palavra) =>
        palavra.replace(/\s/g, '').toLowerCase() === tipo.replace(/\s/g, '').toLowerCase()
      ) ?? tipo 
    );

  return encontrados.join(', ');
}
