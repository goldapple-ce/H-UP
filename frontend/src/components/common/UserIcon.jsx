import noImage from '@asset/img/no_image.png';

export default function UserIcon({ src, alt }) {
  return <img src={src ? src : noImage} alt={alt} />;
}
