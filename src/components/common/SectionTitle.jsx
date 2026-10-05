import PropTypes from 'prop-types';

function SectionTitle({ as: Tag = 'h2', children, align = 'left' }) {
  return <Tag className={`section-title section-title--${align}`}>{children}</Tag>;
}

SectionTitle.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['left', 'center']),
};

export default SectionTitle;
