# Recuperação de Senha


**RF**   

- O Usuário deve poder recuperar sua senha informando o seu e-mail
- O Usuário deve receber um email com instruções de recuperação de senha
- O Usuário deve poder resetar sua Senha

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job)


**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;



# Atualização do Perfil

**RF** 

- O usuário deve poder atualizar seu nome, email e senha;

**RN** 

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar sua senha;


# Painel do Prestador


**RF**

- O Usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas;                                                  
-  

**RNF**
- Os agendamentos do prestador no dia devem ser armezenados em cache;
- As notificações do prestador devem ser armezanadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando socket.io
- 


# Agendamento de Serviços

**RF**
- O usuário deve poder listar todos os prestadores de serviço cadastros;
- Deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários específicos em um dia específico de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armezanada em cache;
- 


**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h ( Primeiro às 8h, último às 17h)
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo


