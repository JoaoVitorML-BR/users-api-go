Regra Geral:
Sucesso (2xx) → Sempre retorna data
Erro (4xx, 5xx) → Sempre retorna data: null

Cenários:
Operação	Status	Retorna data?	Exemplo
Login com sucesso	200	✅ SIM	{ token, user }
Login com erro	401	❌ NÃO	data: null
Criar usuário ✅	201	✅ SIM	{ user criado }
Criar usuário ❌	409/400	❌ NÃO	data: null
Listar usuários ✅	200	✅ SIM	[ users ]
Listar usuários ❌	500	❌ NÃO	data: null
Atualizar ✅	200	✅ SIM	{ user atualizado }
Atualizar ❌	404/400	❌ NÃO	data: null
Deletar ✅	204	❌ NÃO	data: null (sem corpo)
Deletar ❌	404	❌ NÃO	data: null