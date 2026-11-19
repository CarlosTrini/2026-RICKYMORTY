import { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}
const FallbackImage = ({
    src,
    fallbackSrc = '/images/empty-image.jpeg',
    alt = '',
    ...props
}: Props) => {
    const [hasError, setHasError] = useState(false);
    return (
        <img
            src={hasError || !src ? fallbackSrc : src}
            alt={alt}
            onError={() => setHasError(true)}
            {...props}
        />
    );
};

export default FallbackImage;