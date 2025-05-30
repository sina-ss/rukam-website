import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { homeTexts } from "@/constants/home-texts";

const NewsSection = () => {
  const { news } = homeTexts;

  const newsWithMeta = news.items.map((article, index) => ({
    ...article,
    id: index + 1,
    href: `/news/${index + 1}`,
  }));

  const getCategoryColor = (category: string) => {
    const colorMap = {
      "اخبار عمومی": "bg-primary/10 text-primary",
      توسعه: "bg-accent/10 text-accent",
      اقتصاد: "bg-brand-teal/10 text-brand-teal",
    };
    return (
      colorMap[category as keyof typeof colorMap] ||
      "bg-muted/50 text-muted-foreground"
    );
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-accent/10 text-accent border-accent/20">
            <span className="ml-2">📰</span>
            {news.badge}
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            {news.title.split(news.titleHighlight)[0]}
            <span className="text-primary">{news.titleHighlight}</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {news.description}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsWithMeta.map((article) => (
            <article
              key={article.id}
              className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-brand-teal/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      article.category
                    )}`}
                  >
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta */}
                <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <Button
                  variant="ghost"
                  className="w-full justify-between group-hover:bg-primary/10 transition-colors p-0 h-auto"
                  asChild
                >
                  <a
                    href={article.href}
                    className="flex items-center justify-between w-full py-2"
                  >
                    <span>{news.readMore}</span>
                    <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* View All News */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="text-lg px-8">
            {news.viewAll}
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
