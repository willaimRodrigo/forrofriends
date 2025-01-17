export const SelectedAlbum = ({ onAlbumSelect }) => {
    const albums = [
        { 
            name: "Black",
            key: "black"
        },
        {
            name: "Blueadv",
            key: "blueadv"
        },
        {
            name: "Blue",
            key: "blue"
        },
        {
            name: "Party",
            key: "party"
        },
        {
            name: "White",
            key: "white"
        },
        {
            name: "Blueint",
            key: "blueint"
        },
        {
            name: "Pre",
            key: "pre"
        }
    ];

    const handleSelect = (event) => {
        onAlbumSelect(event.target.value)
    }

    return (
        <div className="Album-selector">
            <label htmlFor="album">Escolha o Álbum:</label>
            <select id="album" onChange={handleSelect}>
                {albums.map((album) => (
                    <option key={album.key} value={album.key}>
                        {album.name}
                    </option>
                ))}
            </select>
        </div>
    )
}