function chunkArray(arr, n) {
    // haio @ GitHub.com

    if (!arr || !n) return arr;

    var length = arr.length;
    var slicePoint = 0;
    var ret = [];

    while (slicePoint < length) {
        ret.push(arr.slice(slicePoint, slicePoint + n));
        slicePoint += n;
    }
    return ret;
}

$("form").on("submit", async e => {
    e.preventDefault();
    const uname = $("#uname").val();
    const res = await fetch(`https://api.github.com/users/${uname}/repos`);
    if (!res.ok) return alert("error");
    const json = (await res.json()).map((repo) => {
        repo.pushed_at = new Date(repo.pushed_at);
        return repo;
    });
    const month_ago = new Date();
    month_ago.setMonth(month_ago.getMonth() - 1);
    const processed = json
        .sort((a, b) => a.pushed_at.getTime() - b.pushed_at.getTime())
        .filter(
            repo => repo.pushed_at.getTime() < month_ago && !repo.archived
        );

    function GithubRepo(repo) {
        return `
    <div class="card col w-25">
        <h4>${repo.name}</h4>
        <p class="text-overflow">${repo.description}</p>
        <a class="btn primary" href="${repo.html_url}">View</a>
    </div>`;
    }

    $("#result").html(
        chunkArray(processed.map(GithubRepo), 4)
            .map(arr => arr.join(""))
            .map(html => `<div class="row">${html}</div>`)
            .join("\n")
    );
});
