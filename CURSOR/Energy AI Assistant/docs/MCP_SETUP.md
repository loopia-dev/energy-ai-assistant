# Configuração do MCP Supabase

## Como reconfigurar o MCP para usar a organização correta

### Passo 1: Obter Personal Access Token

1. Aceda ao [Dashboard do Supabase](https://supabase.com/dashboard)
2. Certifique-se de que está logado na conta/organização correta (`rkkwcuervgqqfleloikp`)
3. Vá a **Account Settings** > **Access Tokens**: https://supabase.com/dashboard/account/tokens
4. Clique em **Generate New Token**
5. Dê um nome descritivo (ex: "Cursor MCP")
6. Copie o token gerado (só aparece uma vez!)

### Passo 2: Configurar no Cursor

O MCP do Supabase é configurado através de variáveis de ambiente ou ficheiro de configuração.

#### Opção A: Variáveis de Ambiente

Adicione ao seu ficheiro de ambiente do sistema (ou `.env` do Cursor):

```bash
SUPABASE_ACCESS_TOKEN=seu-token-aqui
```

#### Opção B: Ficheiro de Configuração MCP

O Cursor geralmente usa um ficheiro de configuração MCP. Procure por:
- `~/.cursor/mcp.json` ou
- Configurações do Cursor > MCP Settings

Exemplo de configuração:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "seu-token-aqui"
      }
    }
  }
}
```

### Passo 3: Reiniciar Cursor

Após configurar, reinicie o Cursor para que as alterações tenham efeito.

### Passo 4: Verificar

Após reiniciar, pode verificar se está a funcionar corretamente:

```bash
# No Cursor, tente listar projetos
# Deve aparecer o projeto gpicejqhlvjisgyohnpx
```

## Troubleshooting

### Token não funciona
- Certifique-se de que o token foi gerado na conta/organização correta
- Verifique se o token não expirou
- Gere um novo token se necessário

### MCP não reconhece o projeto
- Verifique se o token tem permissões suficientes
- Confirme que está na organização correta no dashboard

### Ainda vê projetos da organização antiga
- Limpe o cache do Cursor
- Verifique se há múltiplas configurações MCP conflitantes

## Referências

- [Supabase MCP Server](https://github.com/supabase/mcp-server-supabase)
- [Supabase Dashboard](https://supabase.com/dashboard)

