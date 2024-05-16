export default function UserIcon({ src, alt }) {
  return <img src={src ? src : '/src/assets/img/no_image.png'} alt={alt} />;
}
