import { couple } from "../../data/couple";

function imageCard(image: string, alt: string) {
    return (
        <div className="flex-1 relative">
            <img 
                src={image} 
                alt={alt} 
                className="w-full h-50 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 rounded-lg" />
            <p className="p-2 pl-4 bottom-0 absolute font-bold text-xl text-white">{alt}</p>   
        </div>
    );
}

export function MeetTheCouple() {
    return (
        <div className="flex flex-col bg-[#292929] rounded-3xl h-72 p-4">
            <h2>Conheça {couple.names.man} e {couple.names.woman}</h2>
            <div className="flex flex-row gap-4 p-4 overflow-x-auto">
                {imageCard(couple.song.cover, "Foto do casal 1")} 
                {imageCard(couple.song.cover, "Foto do casal 2")}
                {imageCard(couple.song.cover, "Foto do casal 3")}
            </div>
        </div>
    );
}