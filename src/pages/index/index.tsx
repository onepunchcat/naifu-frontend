import { Button } from '../../components/form'
import { IconHeart, IconRefresh } from '../../components/icon'
import { Introduction } from '../../components/introduction'
import { BaseLayout } from '../../components/layout'
import { Preview } from '../../components/preview'

export function Index() {
  return (
    <BaseLayout>
      <div className="flex flex-col lg:flex-row items-stretch gap-8 pb-16 lg:pb-0">
        <Introduction />
        <section id="image-generate" className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center items-center">
            <Preview src="https://i.imgur.com/Gg4Vb5d.png">
              <div className="absolute bottom-0 grid grid-cols-2 gap-5 p-5">
                <Button className="ml-auto" variant="secondary" type="button" circle>
                  <IconRefresh className="rotate-90 w-6 md:w-10" />
                </Button>
                <Button className="mr-auto" variant="primary" type="button" circle>
                  <IconHeart className="w-6 md:w-10" />
                </Button>
              </div>
            </Preview>
          </div>
          <div className="w-full h-100"></div>
        </section>
      </div>
    </BaseLayout>
  )
}
