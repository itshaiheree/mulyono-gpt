import Link from 'next/link'
import Content from './components/content';
import ButtonNotFound from './components/buttonNotFound';

export const metadata = {
  title: "Yo Ndak Ada Kok Tanya Saya! - MulyonoGPT",
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
      <h2 className="text-3xl font-bold">Yo Ndak Ada, Kok Tanya Saya!</h2>
      <p className="text-xl">
        File/Halaman Yang Kamu Cari Ndak Ada Di Sini. Coba Cek Lagi Link-nya!
      </p>
      <ButtonNotFound />
    </div>
  </Content>
</section>

      </>
  )
}

export default NotFound;