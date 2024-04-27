import { Footer } from 'flowbite-react';

const MyFooter = () => {
  return (
    <Footer bgDark>
      <div className="w-full px-4 lg:px-24">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="" />
            <Footer.LinkGroup col>
              <Footer.Link href="#"></Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="" />
            <Footer.LinkGroup col>
              <Footer.Link href="#"></Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Manga Mania™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default MyFooter