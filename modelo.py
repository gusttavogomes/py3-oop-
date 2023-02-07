class Programa:
    def __init__(self, nome, ano):
        self._nome = nome.title()
        self.ano = ano
        self._likes = 0

    @property
    def likes(self):
        return self._likes

    def dar_like(self):
        self._likes += 1

    @property
    def nome(self):
        return self._nome

    @nome.setter
    def nome(self, novo_nome):
        self._nome = novo_nome.title()


class Filme (Programa):
    def __init__(self, nome, ano, duracao):
        super().__init__(nome, ano)  # chamando o inicializador da classe mãe
        self.duracao = duracao

    # def ### Parei AQUI


class Serie (Programa):
    def __init__(self, nome, ano, temporadas):
        super().__init__(nome, ano)  # chamando o inicializador da classe mãe
        self.temporadas = temporadas


vingadores = Filme("vingadores - guerra infinita", 2018, 160)
print(vingadores.nome)
print(vingadores.duracao)

breaking_bad = Serie("breaking Bad", 2008, 5)
print("A série {} teve {} temporadas e a primeira foi em {} e tem {} likes.".format(
    breaking_bad.nome, breaking_bad.temporadas, breaking_bad.ano, breaking_bad.likes))

# dar 10 likes
for x in range(10):
    breaking_bad.dar_like()

print("A série {} teve {} temporadas e a primeira foi em {} e tem {} likes.".format(
    breaking_bad.nome, breaking_bad.temporadas, breaking_bad.ano, breaking_bad.likes))
