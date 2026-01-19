# 🚀 Guia de Deploy - GitHub Pages

## Checklist Pré-Deploy

Antes de fazer push para o GitHub, verifique:

- [ ] Todos os links estão funcionando
- [ ] Imagens carregando corretamente
- [ ] Console sem erros no navegador
- [ ] Teste em diferentes navegadores (Chrome, Firefox, Safari)
- [ ] Teste responsividade (mobile, tablet, desktop)
- [ ] Performance check com Lighthouse
- [ ] Validação HTML (https://validator.w3.org/)
- [ ] Validação CSS (https://jigsaw.w3.org/css-validator/)

## Comandos de Deploy

### 1. Verificar Status
```bash
git status
```

### 2. Adicionar Arquivos
```bash
# Adicionar todos os arquivos
git add .

# Ou adicionar específicos
git add index.html assets/
```

### 3. Commit
```bash
# Commit com mensagem descritiva
git commit -m "feat: implementa arquitetura modular e otimizações de performance

- Refatora JavaScript em módulos ES6
- Corrige lag do cursor customizado
- Adiciona meta tags SEO completas
- Otimiza animações de partículas
- Adiciona documentação completa"
```

### 4. Push para GitHub
```bash
git push origin main
```

### 5. Verificar Deploy
- Aguarde 2-5 minutos
- Acesse: https://edvannps.github.io/
- Limpe cache do navegador (Ctrl+Shift+R)

## Convenções de Commit

### Tipos:
- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Apenas documentação
- **style**: Mudanças de formatação
- **refactor**: Refatoração de código
- **perf**: Melhoria de performance
- **test**: Adicionar testes
- **chore**: Tarefas de manutenção

### Exemplos:
```bash
git commit -m "feat: adiciona novo projeto ao portfólio"
git commit -m "fix: corrige menu mobile não fechando"
git commit -m "perf: otimiza carregamento de imagens"
git commit -m "docs: atualiza README com instruções"
```

## Rollback (se necessário)

### Desfazer último commit (mantendo alterações)
```bash
git reset --soft HEAD~1
```

### Desfazer último commit (descartando alterações)
```bash
git reset --hard HEAD~1
```

### Reverter para commit específico
```bash
# Listar commits
git log --oneline

# Reverter
git revert <commit-hash>
```

## Troubleshooting

### Deploy não reflete mudanças
1. Limpe cache do navegador
2. Aguarde alguns minutos
3. Verifique GitHub Actions (se configurado)
4. Force refresh: Ctrl+Shift+R

### Erro 404
1. Verifique se branch é `main`
2. Verifique se pasta é `/ (root)`
3. Settings > Pages > Source

### Módulos ES6 não carregam
1. Verifique `type="module"` no script
2. Teste localmente com servidor HTTP
3. Nunca use `file://` protocol

### Imagens não aparecem
1. Verifique paths relativos
2. Certifique-se que imagens estão no repo
3. Verifique case-sensitive (Linux)

## Performance Check

### Lighthouse CI
```bash
# Instalar
npm install -g @lhci/cli

# Rodar
lhci autorun --collect.url=https://edvannps.github.io/
```

### Manual
1. Chrome DevTools (F12)
2. Lighthouse tab
3. Generate report
4. Verificar scores

## Manutenção Pós-Deploy

### Semanalmente
- Verificar links quebrados
- Monitorar console errors
- Testar em dispositivos reais

### Mensalmente
- Atualizar dependências
- Adicionar novos projetos
- Lighthouse audit
- Backup do código

### Trimestralmente
- Revisar todo conteúdo
- Otimizar imagens
- Atualizar skills/tecnologias
- A/B testing de design

## Contato e Suporte

Se encontrar problemas:
1. Verifique console do navegador
2. Verifique logs do Git
3. Consulte a documentação no README.md

---

**Última atualização**: 19/01/2026
**Versão**: 2.0.0
