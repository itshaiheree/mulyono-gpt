import Link from 'next/link'
import Content from './components/content';
import ButtonNotFound from './components/buttonNotFound';

export const metadata = {
  title: "Non inventum!",
};

const NotFound = async () => {
  return (
      <>
<section
  id="top"
  className="
    fixed inset-0
    flex items-center justify-center
    text-center
    bg-base-200
    overflow-hidden
  "
>
  <Content>
    <div className="space-y-5 md:space-y-4">
      <h2 className="text-3xl font-bold">Non inventum!</h2>
      <p className="text-xl">
        Sorry, we can't find that page. Double check your link and try again!
      </p>
      <ButtonNotFound />
    </div>
  </Content>
</section>

      </>
  )
}

export default NotFound;