import PropTypes from 'prop-types';
import Icon from './Icon';
import LocalizedLink from './LocalizedLink';

function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-ink-900">{item.name}</span>
              ) : (
                <>
                  <LocalizedLink to={item.path} className="hover:text-ink-900 hover:underline">
                    {item.name}
                  </LocalizedLink>
                  <Icon name="chevronRight" size={12} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
};

export default Breadcrumbs;
