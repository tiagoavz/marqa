"""Monta a versão publicável do Portfólio MARQA a partir de site/.

O MP4 original do hero permanece versionado dentro do pacote histórico LAB22
para evitar cópias binárias de vários megabytes a cada atualização do site.
"""
from pathlib import Path
from zipfile import ZipFile
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'site'
TARGET = ROOT / 'dist' / 'site'
HISTORIC_ZIP = ROOT / 'dist' / 'MARQA_LAB22_NETLIFY_COMPLETO.zip'

if not (SOURCE / 'index.html').is_file():
    sys.exit('Erro: arquivo site/index.html não encontrado.')
if TARGET.exists():
    shutil.rmtree(TARGET)
shutil.copytree(SOURCE, TARGET)

video = TARGET / 'assets' / 'marqa-hero-1080p.mp4'
if not video.is_file():
    if not HISTORIC_ZIP.is_file():
        sys.exit('Erro: pacote histórico dist/MARQA_LAB22_NETLIFY_COMPLETO.zip ausente.')
    with ZipFile(HISTORIC_ZIP) as z:
        matches = [name for name in z.namelist() if name.endswith('assets/marqa-hero-1080p.mp4')]
        if not matches:
            sys.exit('Erro: vídeo do Hero não encontrado no pacote histórico LAB22.')
        video.parent.mkdir(parents=True, exist_ok=True)
        with z.open(matches[0]) as src, video.open('wb') as dst:
            shutil.copyfileobj(src, dst)

if video.stat().st_size < 2_000_000:
    sys.exit('Erro: tamanho do Hero inesperadamente pequeno.')
client_count = len(list((TARGET / 'projetos').glob('*/index.html')))
if client_count != 36:
    sys.exit(f'Erro: esperadas 36 páginas de clientes, encontradas {client_count}.')
for path in ['sections/streaming.js','sections/metodologia.js','sections/cases-editorial.css','client/client.js']:
    if not (TARGET / path).is_file():
        sys.exit(f'Erro: arquivo obrigatório ausente: {path}')
print(f'MARQA | site gerado em {TARGET} | {client_count} projetos | Hero {video.stat().st_size} bytes')
