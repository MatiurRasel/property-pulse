import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,

} from 'react-share';

const ShareButtons = ({property}) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this property
      </h3>
      <div className="flex justify-center space-x-4 py-4">
        <FacebookShareButton 
          url={shareUrl} 
          quote={property.name} 
          hashtag={`#${property.type.replace(/\s/g,'')}ForRent`}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton 
          url={shareUrl} 
          title={property.name} 
          hashtags={[`${property.type.replace(/\s/g,'')}ForRent`]}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton 
          url={shareUrl} 
          quote={property.name} 
          separator=':: '>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl} 
          quote={property.name} 
          hashtag={`#${property.type.replace(/\s/g,'')}ForRent`}>
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>
        <PinterestShareButton 
          url={shareUrl} 
          quote={property.name} 
          hashtag={`#${property.type.replace(/\s/g,'')}ForRent`}>
          <PinterestIcon size={40} round={true} />
        </PinterestShareButton>
        <EmailShareButton 
           url={shareUrl} 
           subject={property.name} 
           body={`Check out this property listing: ${shareUrl}}>`}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>

      </div>
    </>
  )
}

export default ShareButtons