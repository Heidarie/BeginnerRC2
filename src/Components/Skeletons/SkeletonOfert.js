import SkeletonElement from "./SkeletonElement";

export const SkeletonOfert = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-oferta">
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
      </div>
    </div>
  );
};
export default SkeletonOfert;
