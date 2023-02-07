class Programa:
    def __init__(self, nome, ano):
        self._nome = nome.title()
        self.ano = ano
        self._likes = 0

    @property
    def likes(self):
        return self._likes

    def dar_likes(self):
        self._likes += 1

    @property
    def nome(self):
        return self._nome

    @nome.setter
    def nome(self, nome):
        self._nome = nome

    def __str__(self):
        return f'Nome: {self.nome} Likes: {self.likes}'


class Filme(Programa):
    def __init__(self, nome, ano, duracao):
        super().__init__(nome, ano)
        self.duracao = duracao

    def __str__(self):
        return f'Nome: {self.nome} - {self.duracao} min - Likes: {self.likes}'


class Serie(Programa):
    def __init__(self, nome, ano, temporadas):
        super().__init__(nome, ano)
        self.temporadas = temporadas

    def __str__(self):
        return f'Nome: {self.nome} - {self.temporadas} temporadas - Likes: {self.likes}'


class Playlist():
    def __init__(self, nome, programas):
        self.nome = nome
        self._programas = programas

    def __getitem__(self, item):
        return self._programas[item]

    def __len__(self):
        return len(self._programas)


vingadores = Filme('vingadores - guerra infinita', 2018, 160)
atlanta = Serie('atlanta', 2018, 2)
tmep = Filme('todo mundo em panico', 1999, 100)
demolidor = Serie('demolidor', 2016, 2)
breaking_bad = Serie("breaking Bad", 2008, 5)


vingadores.dar_likes()
vingadores.dar_likes()
vingadores.dar_likes()
atlanta.dar_likes()
atlanta.dar_likes()
tmep.dar_likes()
tmep.dar_likes()
demolidor.dar_likes()
demolidor.dar_likes()

# dar 3 likes
for x in range(3):
    breaking_bad.dar_likes()

# print("A série {} teve {} temporadas e a primeira foi em {} e tem {} likes.".format(
# breaking_bad.nome, breaking_bad.temporadas, breaking_bad.ano, breaking_bad.likes))

# dar 10 likes
for x in range(10):
    breaking_bad.dar_likes()

# print("A série {} teve {} temporadas e a primeira foi em {} e tem {} likes.".format(
# breaking_bad.nome, breaking_bad.temporadas, breaking_bad.ano, breaking_bad.likes))

listinha = [atlanta, vingadores, demolidor, tmep, breaking_bad]
minha_playlist = Playlist('fim de semana', listinha)

for programa in minha_playlist:
    print(programa)

#print(f'Tamanho: {len(minha_playlist.listagem)}')


filmes_e_series = [vingadores, breaking_bad]
playlist_fim_de_semana = Playlist('Fim de Semana', filmes_e_series)


print(vingadores in playlist_fim_de_semana)

for programa in playlist_fim_de_semana:
    print(programa)

for programa in minha_playlist:
    print(programa)
