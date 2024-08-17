document.addEventListener('DOMContentLoaded', function() {
    const paginationLinks = document.querySelectorAll('.pagination .page-link');

    paginationLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            paginationLinks.forEach(link => link.parentElement.classList.remove('active'));    
            this.parentElement.classList.add('active');         
        });
    });
});


document.getElementById('searchButton').addEventListener('click', function() {
  const jobRole = document.getElementById('jobRole').value.toLowerCase();
  const jobExperience = document.getElementById('jobExperience').value.toLowerCase();
  const city = document.getElementById('city').value.toLowerCase();

  fetch('jobs.json')
      .then(response => response.json())
      .then(data => {
          const filteredJobs = data.filter(job => {
              const jobTitle = job.title.toLowerCase();
              const jobLocation = job.location.toLowerCase();
              const jobExp = job.experience.toLowerCase();

              return (jobTitle.includes(jobRole) || !jobRole) &&
                     (jobExp.includes(jobExperience) || !jobExperience) &&
                     (jobLocation.includes(city) || !city);
          });

          displayJobs(filteredJobs);
      })
      .catch(error => console.error('Error loading job openings:', error));
});

document.addEventListener('DOMContentLoaded', function() {
  fetch('jobs.json')
      .then(response => response.json())
      .then(data => {
          displayJobs(data);
      })
      .catch(error => console.error('Error loading job openings:', error));
});

function displayJobs(jobs) {
  const jobCardsContainer = document.getElementById('jobCardsContainer');
  jobCardsContainer.innerHTML = '';

  if (jobs.length === 0) {
      jobCardsContainer.innerHTML = '<div class="col-md-12 text-center"><p>Sorry, No jobs found matching your criteria!</p></div> ';
      return;
  }

  jobs.forEach(job => {
      const jobCard = `
          <div class="col-md-6 mb-4">
              <div class="card">
                  <h5 class="card-header">${job.title}</h5>
                  <div class="card-body">
                      <p class="card-text"><img src='Images/experience.svg' alt='experience'> ${job.experience}</p>
                      <p class="card-text"><img src='Images/rupee.svg' alt='rupee'> ${job.salary}</p>
                      <p class="card-text"><img src='Images/location.svg' alt='location'> ${job.location}</p>
                  </div>
                  <div class="card-footer">
                      <div>Posted on ${job.date}</div>
                      <div><a href="https://forms.gle/YgeC5UWcjhWzescM6" class="btn btn-primary">Apply Now</a></div>
                  </div>
              </div>
          </div>
      `;
      jobCardsContainer.innerHTML += jobCard;
  });
}
