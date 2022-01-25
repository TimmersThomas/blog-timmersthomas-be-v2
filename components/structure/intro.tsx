import TextLink from "../generic/textLink"

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-center md:text-left text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        Just a simple <span className="text-3xl italic">&apos;tech&apos;</span> blog
      </h1>
      <span className="text-center md:text-left text-lg mt-5 md:pl-8">
        by <TextLink href="https://timmersthomas.be" target="_blank" rel="noopener" >Timmers Thomas</TextLink>
      </span>
    </section>
  )
}

export default Intro
