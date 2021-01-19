class GotServise{
	async getResourse(url){
		const res = await fetch(url);
		if (!res.ok){
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
			
		}
		return await res.json();
	}
	getAllCharacters(){
		return this.getResourse('https://www.anapioficeandfire.com/api/characters?page=5&pageSize=10');
	}
	getCharacter(id){
		return this.getResourse(`https://www.anapioficeandfire.com/api/characters?pageSize=${id}`);
	}

}

const got = new GotServise();

got.getAllCharacters()
	.then(res => console.log(res));

got.getCharacter(1)
	.then(res => console.log(res));	