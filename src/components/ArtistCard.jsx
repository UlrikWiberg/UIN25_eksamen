import "../styles/ArtistCard.scss"

export default function ArtistCard({ artist }) {
    return (
      <article className="artistcard">
        <h3>{artist.name}</h3>
        {artist.images?.[0]?.url && (
          <img src={artist.images[0].url} alt={artist.name} />
        )}
      </article>
    );
  }
  
  